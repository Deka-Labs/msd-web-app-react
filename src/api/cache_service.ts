import axios from "axios"
import { Buffer } from "buffer"

export type CacheCreateInfo = {
    position: L.LatLng,
    description: string,
    hint: string,
}

export type ObjectID = {
    $oid: string,
}

export type Cache = {
    _id: ObjectID,
    position: L.LatLng,
    description: string,
    hint: string,
}

export type CacheView = {
    caches: Cache[]
}

export type CacheAdded = {
    id: number
}

function api_base(): string {
    const api_base_env = process.env.REACT_APP_CACHE_SERVICE_ADDRESS
    if (!api_base_env) {
        console.log("Cache service not set: provide REACT_APP_CACHE_SERVICE_ADDRESS env with address")
        alert("Сервис тайников не задан")
    }

    return (api_base_env || "") + "/api/v1"
}

function api_route(path: string): string {
    const base = api_base();
    return base + "/" + path
}

function auth_headers(): any {
    let user = localStorage.getItem("user_email") || "";
    let pass = localStorage.getItem("password") || "";

    let credentials = user + ":" + pass;
    let enc_cred = Buffer.from(credentials).toString('base64')

    return {
        Authorization: "Basic " + enc_cred
    }
}

export function cache_service_insert_cache(create_info: CacheCreateInfo) {
    const cache_route = api_route("cache");

    return axios.post<CacheAdded>(cache_route, create_info, {
        headers: auth_headers()
    })
}

export function cache_service_get_caches(user_id: number | null, sw_bound: L.LatLng, ne_bound: L.LatLng) {
    const cache_route = api_route("cache");

    type GetParams = {
        user_id?: number,

        min_lat?: number,
        max_lat?: number,

        min_long?: number,
        max_long?: number,
    }

    let params: GetParams = {
        min_lat: sw_bound.lat,
        max_lat: ne_bound.lat,
        min_long: sw_bound.lng,
        max_long: ne_bound.lng,
    }

    if (user_id) {
        params.user_id = user_id;
    }



    return axios.get<CacheView>(cache_route, {
        params: params,
    })
}

export function cache_service_get_cache(cache_id: string) {
    const cache_route = api_route(`cache/${cache_id}`);
    return axios.get<CacheView>(cache_route)
}

export function cache_service_delete_cache(cache_id: string) {
    const cache_route = api_route(`cache/${cache_id}`);
    return axios.delete<any>(cache_route, { headers: auth_headers() })
}