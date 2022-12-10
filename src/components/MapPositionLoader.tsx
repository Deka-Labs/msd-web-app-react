import { useEffect } from "react";
import { useMap } from "react-leaflet";



export function MapPositionLoader() {
    const map = useMap();

    function restore_map(m: L.Map) {
        // Recover
        let lat = localStorage.getItem("map_pos_lat");
        let lng = localStorage.getItem("map_pos_lng");
        let zoom = localStorage.getItem("map_zoom");
        if (lat && lng && zoom) {
            console.log(`Restore [${lat}, ${lng}] ${zoom}`)
            m.setView([parseFloat(lat), parseFloat(lng)], parseFloat(zoom))
        } else {
            console.log(`Fallback to standart view`)
            m.setView([59.9, 30.20], 13)
        }
    }

    useEffect(() => {
        restore_map(map)
    }, [map])

    return (<></>)
}