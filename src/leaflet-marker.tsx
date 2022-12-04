import L from 'leaflet'

export function marker_icon(): L.Icon {
    return L.icon({
        iconUrl: '/marker-icon.png',
        shadowUrl: '/marker-shadow.png',

        iconSize: [25, 41], // size of the icon
        shadowSize: [41, 41], // size of the shadow
        iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        shadowAnchor: [12, 41],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
}