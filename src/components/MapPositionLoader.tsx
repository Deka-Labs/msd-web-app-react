import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";



export function MapPositionLoader() {
    const map = useMap();

    function restore_map(m: L.Map) {
        // Recover
        let lat = localStorage.getItem("map_pos_lat");
        let lng = localStorage.getItem("map_pos_lng");
        if (lat && lng) {
            m.setView([parseFloat(lat), parseFloat(lng)])
        }

        let zoom = localStorage.getItem("map_zoom");
        if (zoom) {
            m.setZoom(parseFloat(zoom))
        }
    }

    useEffect(() => {
        restore_map(map)
    }, [map])

    return (<></>)
}