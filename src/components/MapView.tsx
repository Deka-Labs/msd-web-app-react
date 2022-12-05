import { useState } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { cache_service_get_caches, CacheView } from "../api/cache_service";
import { CacheMarker } from "./CacheMarker";


type MapState = {
    show_hint: boolean,
}

type MapEventProps = {
    cacheSelected: (id: string) => void
}

function MapEventHandler(props: MapEventProps) {
    const map = useMap()

    const [view, setView] = useState<CacheView | null>(null);

    const fetchCaches = async () => {
        let bounds = map.getBounds();

        cache_service_get_caches(null, bounds.getSouthWest(), bounds.getNorthEast()).then(
            (response) => {
                setView(response.data)
            }
        ).catch((r) => console.log(r))
    }


    useMapEvents({
        zoomend: fetchCaches,
        moveend: fetchCaches,
    })

    if (!view) {
        return (<></>)
    }

    const select_function = (id: string) => {
        props.cacheSelected(id)
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
}

export function MapView(p: MapViewProps) {

    return (
        <MapContainer center={[59.9, 30.20]} zoom={13} className="map-container">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapEventHandler cacheSelected={p.cacheSelected}></MapEventHandler>

        </MapContainer>

    )
}
