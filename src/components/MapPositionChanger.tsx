import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";

type MapPositionProps = {
    position: L.LatLng | null
}

export function MapPosition(props: MapPositionProps) {
    const map = useMap();

    useEffect(() => {
        if (props.position) {
            map.flyTo(props.position)
        }

    }, [props.position])


    return (<></>)
}