import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Cache, cache_service_get_cache } from '../api/cache_service'

type CacheViewProps = {
    selected_id?: string | null,
    unlocked?: boolean // Means that add, delete, edit buttons avaiable
}

export function CacheView({ selected_id = null, unlocked = false }: CacheViewProps) {

    const [cache, setCache] = useState<Cache | null>(null);

    useEffect(() => {
        if (selected_id) {
            cache_service_get_cache(selected_id).then((r) => {
                let cache_view = r.data;
                setCache(cache_view.caches[0])
            })
        }
    }, [selected_id])


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
                <Row>
                    <Form.Group controlId="hint">
                        <Form.Label><h4>Подсказка</h4></Form.Label>
                        <Form.Control
                            as="textarea"
                            readOnly
                            rows={3}
                            title="Подсказка чтобы легче было понять где искать тайник"
                            maxLength={256}
                            value={cache?.hint}
                        ></Form.Control>
                    </Form.Group>
                </Row>

                {unlocked &&
                    <Row>
                        <Container className="d-flex justify-content-center">
                            <Button className="mt-3 w-75">Изменить</Button>
                        </Container>
                    </Row>
                }

                {unlocked &&
                    <Row>
                        <Container className="d-flex justify-content-center">
                            <Button className="mt-3 w-75">Удалить</Button>
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