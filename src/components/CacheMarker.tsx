import { Marker } from "react-leaflet"

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

            eventHandlers={{
                click: () => {
                    props.onClick(props.cache_id)
                }
            }}
        >

        </Marker>
    )
}