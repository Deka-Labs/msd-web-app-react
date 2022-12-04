import { AxiosError, isAxiosError } from "axios"
import React, { useState } from "react"
import { Button, Container, Form, Row } from "react-bootstrap"
import { CacheCreateInfo, cache_service_insert_cache } from "../../api/cache_service"
import { MapSelectPoint } from "../../components/MapSelectPoint"


type AddState = {
    position: L.LatLng | null,
    description: string,
    hint: string,
}

function Add(): JSX.Element {

    const [state, setState] = useState<AddState>({
        position: null,
        description: "",
        hint: "",
    })

    function onPositionChange(pos: L.LatLng) {
        setState({ ...state, position: pos })
    }

    function handleDescChange(e: React.FormEvent<HTMLTextAreaElement>) {
        setState({ ...state, description: e.currentTarget.value })
    }

    function handleHintChange(e: React.FormEvent<HTMLTextAreaElement>) {
        setState({ ...state, hint: e.currentTarget.value })
    }

    function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        if (!state.position) {
            alert("Не задано место тайника. Нажмите на карту, где расположен тайник")
            return;
        }

        let create_info: CacheCreateInfo = {
            description: state.description,
            position: state.position,
            hint: state.hint
        }

        cache_service_insert_cache(create_info).then(
            (response) => {
                alert("Добавлено")
            }
        ).catch(
            (reason: Error | AxiosError) => {
                if (isAxiosError(reason)) {
                    if (reason.response?.status === 401) {
                        alert("Необходимо войти на сайт перед добавлением")
                    } else {
                        alert("Внутреняя ошибка, попробуйте позже")
                        console.log("Status code:", reason.response?.status);
                        console.log("Body:", reason.toJSON());
                    }

                } else {
                    alert(reason)
                }

            }
        )

    }




    return (
        <div className="container-fluid">
            <div className="row">
                <h1 className="text-center">Добавить тайник</h1>
            </div>
            <div className="row">
                <div className="col-xl-8">
                    <MapSelectPoint position={state.position} position_changed={onPositionChange}></MapSelectPoint>
                </div>
                <div className="col">
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <h4>Положение</h4>
                        <Row>
                            {state.position &&
                                <>
                                    <Form.Group controlId="lat" className="col-md-6">
                                        <Form.Label>Широта</Form.Label>
                                        <Form.Control type="text" title="Используйте карту для установки" readOnly value={String(state.position?.lat)}></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="lng" className="col-md-6">
                                        <Form.Label>Долгота</Form.Label>
                                        <Form.Control type="text" title="Используйте карту для установки" readOnly value={String(state.position?.lng)}></Form.Control>
                                    </Form.Group>
                                </>
                            }
                            {!state.position &&
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
                                    maxLength={512}
                                    value={state.description}
                                    onChange={(e) => handleDescChange(e as any)}
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
                                    maxLength={256}
                                    value={state.hint}
                                    onChange={(e) => handleHintChange(e as any)}
                                ></Form.Control>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Container className="d-flex justify-content-center">
                                <Button type="submit" className="mt-3 w-75">Добавить</Button>
                            </Container>

                        </Row>


                    </Form>
                </div>
            </div>



        </div>
    )
}

export default Add