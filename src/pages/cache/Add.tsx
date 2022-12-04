import { useState } from "react"
import { Button, Container, Form, Row } from "react-bootstrap"
import { MapSelectPoint } from "../../components/MapSelectPoint"


function Add(): JSX.Element {

    const [position, setPosition] = useState<L.LatLng | null>(null)

    function onPositionChange(pos: L.LatLng) {
        setPosition(pos)
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <h1 className="text-center">Добавить тайник</h1>
            </div>
            <div className="row">
                <div className="col-xl-8">
                    <MapSelectPoint position={position} position_changed={onPositionChange}></MapSelectPoint>
                </div>
                <div className="col">
                    <Form>
                        <h4>Положение</h4>
                        <Row>
                            {position &&
                                <>
                                    <Form.Group controlId="lat" className="col-md-6">
                                        <Form.Label>Широта</Form.Label>
                                        <Form.Control type="text" title="Используйте карту для установки" readOnly value={String(position?.lat)}></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="lng" className="col-md-6">
                                        <Form.Label>Долгота</Form.Label>
                                        <Form.Control type="text" title="Используйте карту для установки" readOnly value={String(position?.lng)}></Form.Control>
                                    </Form.Group>
                                </>
                            }
                            {!position &&
                                <>
                                    <h5>Выберите точку на карте</h5>
                                </>
                            }

                        </Row>
                        <Row>
                            <Form.Group controlId="description">
                                <Form.Label><h4>Описание</h4></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    title="Описание места, чтобы заинтересовать в посещении тайника"
                                ></Form.Control>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group controlId="hint">
                                <Form.Label><h4>Подсказка</h4></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    title="Вы можете оставить подсказку чтобы игрокам легче было понять где искать тайник"
                                ></Form.Control>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Container className="d-flex justify-content-center">
                                <Button className="mt-3 w-75">Добавить</Button>
                            </Container>

                        </Row>


                    </Form>
                </div>
            </div>



        </div>
    )
}

export default Add