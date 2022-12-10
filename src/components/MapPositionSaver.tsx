import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";


export function MapPositionSaver() {
    const map = useMap();

    function save_map() {
        let pos = map.getCenter();
        let zoom = map.getZoom();
        console.log(`Saving map: (${pos}, ${zoom})`)
        localStorage.setItem("map_pos_lat", String(pos.lat));
        localStorage.setItem("map_pos_lng", String(pos.lng));
        localStorage.setItem("map_zoom", String(zoom));
    }

    useMapEvents({
        moveend: save_map,
        zoomend: save_map
    })

    return (<></>)
}