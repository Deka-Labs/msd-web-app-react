import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { cache_service_get_caches, CacheView } from "../api/cache_service";
import { CacheMarker } from "./CacheMarker";


type MapEventProps = {
    cacheSelected: (id: string) => void
    user_id?: number | null
    // This boolean value used to force update 
    reupdate_trigger: boolean
}

function MapEventHandler({ user_id = null, cacheSelected, reupdate_trigger }: MapEventProps) {
    const map = useMap()

    const [view, setView] = useState<CacheView | null>(null);

    const fetchCaches = async () => {
        let bounds = map.getBounds();

        cache_service_get_caches(user_id, bounds.getSouthWest(), bounds.getNorthEast()).then(
            (response) => {
                setView(response.data)
            }
        ).catch((r) => console.log(r))
    }

    useEffect(() => {
        fetchCaches()
    },
        [reupdate_trigger]);


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
        <MapContainer center={[59.9, 30.20]} zoom={13} className="map-container">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapEventHandler user_id={user_id} cacheSelected={cacheSelected} reupdate_trigger={reupdate_trigger}></MapEventHandler>

        </MapContainer>

    )
}
