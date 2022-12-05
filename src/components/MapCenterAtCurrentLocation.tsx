import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";



export function MapCenterAtCurrentLocation() {
    const map = useMap();

    useEffect(() => {
        map.locate()
    }, [])

    useMapEvents({
        locationfound: (e) => {
            console.log(e.latlng)
            map.flyTo(e.latlng)
        }
    })

    return (<></>)
}