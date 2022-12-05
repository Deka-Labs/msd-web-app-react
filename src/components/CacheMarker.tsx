import { Marker } from "react-leaflet"
import { marker_icon } from "../leaflet-marker"

type CacheMarkerProps = {
    position: L.LatLng,
    cache_id: string,
    onClick: (key: string) => void,
    children: React.ReactNode
}

export function CacheMarker(props: CacheMarkerProps) {
    return (
        <Marker
            position={props.position}
            key={props.cache_id}
            icon={marker_icon()}

            eventHandlers={{
                click: () => {
                    props.onClick(props.cache_id)
                }
            }}
        >

        </Marker>
    )
}