import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from 'leaflet'
import { marker_icon } from "../leaflet-marker";
import { useEffect } from "react";
import { MapPositionLoader } from "./MapPositionLoader";

type MapSelectPointProps = {
    position: L.LatLng | null | undefined
    position_changed: ((new_pos: L.LatLng) => void) | undefined | null,
}

export function SelectedPoint(props: MapSelectPointProps) {
    const map = useMap();

    useEffect(() => {
        if (props.position) {
            map.flyTo(props.position)
        }

    }, [props.position])

    useMapEvents({
        click: (e) => {
            if (props.position_changed) {
                props.position_changed(e.latlng)
                map.flyTo(e.latlng)
            }
        },
    })

    return (
        <>
            {props.position && <Marker position={props.position} icon={marker_icon()}></Marker>}
        </>
    )
}

export function MapSelectPoint(props: MapSelectPointProps) {
    return (
        <>
            <MapContainer center={[59.9, 30.20]} zoom={13} className="map-container">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <SelectedPoint position={props.position} position_changed={props.position_changed} />
                {!props.position &&
                    <MapPositionLoader></MapPositionLoader>
                }

            </MapContainer>
        </>
    )
}
