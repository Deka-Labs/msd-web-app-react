import { useCallback, useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { cache_service_get_caches, CacheView } from "../api/cache_service";
import { CacheMarker } from "./CacheMarker";
import { MapPositionLoader } from "./MapPositionLoader";
import { MapPositionSaver } from "./MapPositionSaver";


type MapEventProps = {
    cacheSelected: (id: string) => void
    user_id?: number | null
    // This boolean value used to force update 
    reupdate_trigger: boolean
}

function MapEventHandler({ user_id = null, cacheSelected, reupdate_trigger }: MapEventProps) {
    const map = useMap()

    const [view, setView] = useState<CacheView | null>(null);

    const fetchCaches = useCallback(() => {
        let bounds = map.getBounds();
        cache_service_get_caches(user_id, bounds.getSouthWest(), bounds.getNorthEast()).then(
            (response) => {
                setView(response.data)
            }
        ).catch((r) => console.log(r))
    }, [map, user_id]);



    useEffect(() => {
        fetchCaches()
    },
        [reupdate_trigger, fetchCaches]);


    useMapEvents({
        zoomend: fetchCaches,
        moveend: fetchCaches,
    })

    if (!view) {
        return (<></>)
    }

    const select_function = (id: string) => {
        cacheSelected(id)
    }

    const markers = view?.caches.map((c) => {
        return (
            <CacheMarker
                position={c.position}
                key={c._id.$oid}
                cache_id={c._id.$oid}

                onClick={select_function}
            >

            </CacheMarker>
        )
    }) || <></>



    return (
        <div>
            {markers}
        </div>
    )
}

export type MapViewProps = {
    cacheSelected: (id: string) => void
    user_id?: number | null
    // This boolean value used to force update 
    reupdate_trigger?: boolean
}

export function MapView({ user_id = null, cacheSelected, reupdate_trigger = false }: MapViewProps) {

    return (
        <MapContainer className="map-container">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapPositionLoader></MapPositionLoader>
            <MapPositionSaver></MapPositionSaver>
            <MapEventHandler user_id={user_id} cacheSelected={cacheSelected} reupdate_trigger={reupdate_trigger}></MapEventHandler>

        </MapContainer>

    )
}
