import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L from 'leaflet'
import { marker_icon } from "../leaflet-marker";

type MapSelectPointProps = {
    position: L.LatLng | null | undefined
    position_changed: ((new_pos: L.LatLng) => void) | undefined | null,
}

export function SelectedPoint(props: MapSelectPointProps) {
    useMapEvents({
        click: (e) => {
            if (props.position_changed) {
                props.position_changed(e.latlng)
            }
        }
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
            <MapContainer center={[59.9, 30.20]} zoom={13} className="min-vh-100">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <SelectedPoint position={props.position} position_changed={props.position_changed} />
            </MapContainer>
        </>
    )
}
