import { Container } from "react-bootstrap"
import { MapView } from "../../components/MapView"


function Map(): JSX.Element {
    return (
        <Container>
            <h1>Карта всех тайников</h1>
            <MapView>

            </MapView>
        </Container>
    )
}

export default Map