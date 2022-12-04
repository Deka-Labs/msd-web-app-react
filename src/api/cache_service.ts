import axios from "axios"
import { Buffer } from "buffer"

export type CacheCreateInfo = {
    position: L.LatLng,
    description: string,
    hint: string,
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

export function cache_service_insert_cache(create_info: CacheCreateInfo) {
    const cache_route = api_route("cache");
    let user = localStorage.getItem("user_email") || "";
    let pass = localStorage.getItem("password") || "";

    let credentials = user + ":" + pass;
    let enc_cred = Buffer.from(credentials).toString('base64')

    return axios.post<CacheAdded>(cache_route, create_info, {
        headers: {
            Authorization: "Basic " + enc_cred
        }
    })
}