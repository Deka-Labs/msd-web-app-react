import { AxiosError, isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Cache, cache_service_delete_cache, cache_service_get_cache } from '../api/cache_service'
import { login_service_get_name } from "../api/login_service";

type CacheViewProps = {
    selected_id?: string | null,
    unlocked?: boolean // Means that add, delete, edit buttons avaiable
    onCacheDeleted?: (() => void) | null
}

type CacheViewState = {
    cache: Cache | null,
    user: string | null,
    show_hint: boolean
}

export function CacheView({ selected_id = null, unlocked = false, onCacheDeleted = null }: CacheViewProps) {

    const [state, setState] = useState<CacheViewState>(
        {
            cache: null,
            user: null,
            show_hint: unlocked,
        }
    );

    // Handle selection
    useEffect(() => {
        if (selected_id) {
            cache_service_get_cache(selected_id).then((r) => {
                let cache_view = r.data;
                setState({ ...state, cache: cache_view.caches[0] });
            }).catch(
                (reason: Error | AxiosError) => {
                    if (isAxiosError(reason)) {
                        if (reason.response?.status === 404) {
                            alert("Этот тайник удален")
                            if (onCacheDeleted) onCacheDeleted();
                        } else {
                            alert("Внутреняя ошибка, попробуйте позже")
                            console.log("Status code:", reason.response?.status);
                            console.log("Body:", reason.toJSON());
                        }
                    } else {
                        alert(reason)
                    }

                })
        }
    }, [selected_id])

    // Handle user id change
    useEffect(() => {
        if (selected_id && state.cache?.owner_id) {
            login_service_get_name(state.cache?.owner_id).then((r) => {
                setState({ ...state, user: r.data.login });
            }).catch(
                (reason: Error | AxiosError) => {
                    if (isAxiosError(reason)) {
                        if (reason.response?.status === 404) {

                        } else {
                            alert("Внутреняя ошибка, попробуйте позже")
                            console.log("Status code:", reason.response?.status);
                            console.log("Body:", reason.toJSON());
                        }
                    } else {
                        alert(reason)
                    }

                    setState({ ...state, user: null });
                })
        }
    }, [state.cache?.owner_id])


    const deleteSelected = () => {
        if (selected_id && onCacheDeleted) {
            cache_service_delete_cache(selected_id).then(() => {
                onCacheDeleted()
            })
        }
    }

    // If cache haves owner, display it
    let owner_row = <></>
    if (state.user && !unlocked) {
        owner_row = (
            <Row>
                <Form.Group controlId="description">
                    <Form.Label><h4>Владелец</h4></Form.Label>
                    <Form.Control
                        type="text"
                        readOnly
                        title="Ник владельца тайника"
                        maxLength={512}
                        value={(state.user) ? state.user : "Не найден"}
                    ></Form.Control>
                </Form.Group>
            </Row>
        )
    }

    // Description block not empty -> show it, otherwise hide
    let description_block = (
        <Row>
            <Form.Group controlId="description">
                <Form.Label><h4>Описание: не задано</h4></Form.Label>
            </Form.Group>
        </Row>
    )

    if (state.cache?.description.trim().length != 0) {
        description_block = (
            <Row>
                <Form.Group controlId="description">
                    <Form.Label><h4>Описание</h4></Form.Label>
                    <Form.Control
                        as="textarea"
                        readOnly
                        rows={5}
                        title="Описание места, чтобы заинтересовать в посещении тайника"
                        maxLength={512}
                        value={state.cache?.description}
                    ></Form.Control>
                </Form.Group>
            </Row>
        )
    }

    // As for description but for hint:
    let hint_block = (
        <Row>
            <Form.Group controlId="hint">
                <Form.Label className="mt-2">
                    <Row>
                        <h4 className="col">Подсказка: не задана</h4>
                    </Row>
                </Form.Label>
            </Form.Group>
        </Row>
    )

    if (state.cache?.hint.trim().length != 0) {
        hint_block = (
            <Row>
                <Form.Group controlId="hint">
                    <Form.Label className="mt-2">
                        <Row>
                            <h4 className="col">Подсказка</h4>
                            {!unlocked &&
                                <Button
                                    className="col"
                                    onClick={() => setState({ ...state, show_hint: !state.show_hint })}
                                    aria-controls="hint-expand"
                                    aria-expanded={state.show_hint}
                                >
                                    {state.show_hint ? "Спрятать" : "Показать"}
                                </Button>
                            }

                        </Row>

                    </Form.Label>
                    <div id="hint-expand">
                        <Form.Control
                            hidden={!state.show_hint}
                            as="textarea"
                            readOnly
                            rows={3}
                            title="Подсказка чтобы легче было понять где искать тайник"
                            maxLength={256}
                            value={state.cache?.hint}
                        ></Form.Control>
                    </div>

                </Form.Group>
            </Row>
        )
    }


    let view_cache_part = <></>

    // Cache not set
    if (!selected_id) {
        view_cache_part = <h4>Выберите тайник на карте для просмотра информации о нем</h4>
    } else if (selected_id && !state.cache) {
        view_cache_part = <h4>Получение информации</h4>
    } else {

        view_cache_part = (
            <Form>
                <h4>Положение</h4>
                <Row>
                    <>
                        <Form.Group controlId="lat" className="col-md-6">
                            <Form.Label>Широта</Form.Label>
                            <Form.Control type="text" title="Расположение тайника" readOnly value={String(state.cache?.position?.lat)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="lng" className="col-md-6">
                            <Form.Label>Долгота</Form.Label>
                            <Form.Control type="text" title="Расположение тайника" readOnly value={String(state.cache?.position?.lng)}></Form.Control>
                        </Form.Group>
                    </>
                </Row>
                {owner_row}
                {description_block}
                {hint_block}

                {unlocked &&
                    <Row>
                        <Container className="d-flex justify-content-center">
                            <Button className="mt-3 w-75" href={`/cache/edit/${selected_id}`}>Изменить</Button>
                        </Container>
                    </Row>
                }

                {unlocked &&
                    <Row>
                        <Container className="d-flex justify-content-center">
                            <Button className="mt-3 w-75" onClick={deleteSelected}>Удалить</Button>
                        </Container>
                    </Row>
                }

            </Form>
        )
    }


    return (
        <>
            {view_cache_part}
            {unlocked &&
                <Row>
                    <Container className="d-flex justify-content-center">
                        <Button className="mt-3 w-75" href="/cache/add">Добавить</Button>
                    </Container>
                </Row>
            }
        </>

    )

}