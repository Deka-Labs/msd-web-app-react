import { AxiosError, isAxiosError } from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { cache_service_get_cache } from "../api/cache_service"
import { MapSelectPoint } from "./MapSelectPoint"

export type EditCacheState = {
    position: L.LatLng | null,
    description: string,
    hint: string,
}

type EditCacheParams = {
    cache_id?: string | null
    dataSubmitted: (cache: EditCacheState) => void,
}

export function EditCache({ cache_id = null, dataSubmitted }: EditCacheParams) {

    const [state, setState] = useState<EditCacheState>({
        position: null,
        description: "",
        hint: "",
    })

    const navigate = useNavigate();

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

        dataSubmitted(state)
    }

    useEffect(() => {
        if (cache_id) {
            cache_service_get_cache(cache_id).then((r) => {
                let cache_view = r.data;
                let cache = cache_view.caches[0];
                setState({
                    position: cache.position,
                    description: cache.description,
                    hint: cache.hint
                });
            }).catch(
                (reason: Error | AxiosError) => {
                    if (isAxiosError(reason)) {
                        if (reason.response?.status === 404) {
                            alert("Тайник не найден")
                            navigate("/cache/my")
                        } else {
                            alert("Внутреняя ошибка, попробуйте позже")
                            console.log("Status code:", reason.response?.status);
                            console.log("Body:", reason.toJSON());
                            navigate("/cache/my")
                        }
                    } else {
                        alert(reason)
                    }

                })
        }
    }, [cache_id, navigate])


    // We have not loaded cache to edit yet
    if (cache_id && !state.position) {
        return (
            <div className="d-flex flex-column container-fluid h-100">
                <div className="row">
                    <h1 className="text-center">Измениить тайник</h1>
                </div>
                <div className="row">
                    <h1 className="text-center">Ожидайте, тайник загружается</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="d-flex flex-column container-fluid h-100">
            <div className="row">
                <h1 className="text-center">
                    {cache_id ? "Изменить тайник" : "Добавить тайник"}
                </h1>
            </div>
            <div className="row flex-fill">
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
                                <Button type="submit" className="mt-3 w-75">
                                    {cache_id ? "Изменить" : "Добавить"}
                                </Button>
                            </Container>

                        </Row>


                    </Form>
                </div>
            </div>



        </div>
    )


}