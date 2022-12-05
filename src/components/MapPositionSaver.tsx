import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";



export function MapPositionSaver() {
    const map = useMap();





    function save_map() {
        let pos = map.getCenter();
        let zoom = map.getZoom();
        localStorage.setItem("map_pos_lat", String(pos.lat));
        localStorage.setItem("map_pos_lng", String(pos.lng));
        localStorage.setItem("map_zoom", String(zoom));
    }

    useEffect(() => {

        // Recover
        let lat = localStorage.getItem("map_pos_lat");
        let lng = localStorage.getItem("map_pos_lng");
        if (lat && lng) {
            map.setView([parseFloat(lat), parseFloat(lng)])
        }

        let zoom = localStorage.getItem("map_zoom");
        if (zoom) {
            map.setZoom(parseFloat(zoom))
        }


    },
        [map])

    useMapEvents({
        moveend: save_map,
        zoomend: save_map,
    })

    return (<></>)
}