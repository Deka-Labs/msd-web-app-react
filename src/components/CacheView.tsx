import { AxiosError, isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Cache, cache_service_delete_cache, cache_service_get_cache } from '../api/cache_service'
import { login_service_get_name } from "../api/login_service";

type CacheViewProps = {
    selected_id?: string | null,
    unlocked?: boolean // Means that add, delete, edit buttons avaiable
    onCacheDeleted?: (() => void) | null
}

export function CacheView({ selected_id = null, unlocked = false, onCacheDeleted = null }: CacheViewProps) {

    const [cache, setCache] = useState<Cache | null>(null);
    const [user, setUser] = useState<string | null>(null);
    const [showHint, setShowHint] = useState<boolean>(unlocked)


    const navigate = useNavigate();

    // Handle selection
    useEffect(() => {
        if (selected_id) {
            cache_service_get_cache(selected_id).then((r) => {
                let cache_view = r.data;
                setCache(cache_view.caches[0])
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
    }, [selected_id, onCacheDeleted])

    // Handle user id change
    useEffect(() => {
        if (selected_id && cache?.owner_id) {
            login_service_get_name(cache?.owner_id).then((r) => {
                setUser(r.data.login)
            }).catch(
                (reason: Error | AxiosError) => {
                    if (isAxiosError(reason)) {
                        if (reason.response?.status === 404) {
                            setUser(null)
                        } else {
                            alert("Внутреняя ошибка, попробуйте позже")
                            console.log("Status code:", reason.response?.status);
                            console.log("Body:", reason.toJSON());
                        }
                    } else {
                        alert(reason)
                    }

                    setUser(null)
                })
        }
    }, [cache?.owner_id, selected_id])


    const deleteSelected = () => {
        if (selected_id && onCacheDeleted) {
            cache_service_delete_cache(selected_id).then(() => {
                onCacheDeleted()
            }).catch(
                (reason: Error | AxiosError) => {
                    if (isAxiosError(reason)) {
                        if (reason.response?.status === 401) {
                            alert("Необходимо перезайти для удаления тайника")
                            localStorage.clear()
                            navigate("/")
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
    }

    // If cache haves owner, display it
    let owner_row = <></>
    if (user && !unlocked) {
        owner_row = (
            <Row>
                <Form.Group controlId="description">
                    <Form.Label><h4>Владелец</h4></Form.Label>
                    <Form.Control
                        type="text"
                        readOnly
                        title="Ник владельца тайника"
                        maxLength={512}
                        value={(user) ? user : "Не найден"}
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

    if (cache?.description.trim().length !== 0) {
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
                        value={cache?.description}
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

    if (cache?.hint.trim().length !== 0) {
        hint_block = (
            <Row>
                <Form.Group controlId="hint">
                    <Form.Label className="mt-2">
                        <Row>
                            <h4 className="col">Подсказка</h4>
                            {!unlocked &&
                                <Button
                                    className="col"
                                    onClick={() => setShowHint((show: boolean) => { return !show })}
                                    aria-controls="hint-expand"
                                    aria-expanded={showHint}
                                >
                                    {showHint ? "Спрятать" : "Показать"}
                                </Button>
                            }

                        </Row>

                    </Form.Label>
                    <div id="hint-expand">
                        <Form.Control
                            hidden={!showHint}
                            as="textarea"
                            readOnly
                            rows={3}
                            title="Подсказка чтобы легче было понять где искать тайник"
                            maxLength={256}
                            value={cache?.hint}
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
    } else if (selected_id && !cache) {
        view_cache_part = <h4>Получение информации</h4>
    } else {

        view_cache_part = (
            <Form>
                <h4>Положение</h4>
                <Row>
                    <>
                        <Form.Group controlId="lat" className="col-md-6">
                            <Form.Label>Широта</Form.Label>
                            <Form.Control type="text" title="Расположение тайника" readOnly value={String(cache?.position?.lat)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="lng" className="col-md-6">
                            <Form.Label>Долгота</Form.Label>
                            <Form.Control type="text" title="Расположение тайника" readOnly value={String(cache?.position?.lng)}></Form.Control>
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