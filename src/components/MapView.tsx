import React from "react";
import { Button, Container, Fade, Row } from "react-bootstrap";
import { MapContainer, Marker, TileLayer } from "react-leaflet";


type MapState = {
    show_hint: boolean,
}

export class MapView extends React.Component<any, MapState> {
    constructor(props: any) {
        super(props)
        this.state = {
            show_hint: false,
        }
    }

    render(): React.ReactNode {
        return (
            <Container>
                <Row>
                    <MapContainer center={[59.9, 30.20]} zoom={13} className="col-xl-8 min-vh-100">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[59.9, 30.20]}>
                        </Marker>
                    </MapContainer>

                    <div className="col-xl-4">
                        <h4>Выбрана точка:</h4>
                        <table>
                            <tr>
                                <td><b className="p-2">Идентификатор:</b></td>
                                <td className="p-2">94</td>
                            </tr>
                            <tr>
                                <td><b className="p-2">Создатель:</b></td>
                                <td className="p-2">ДЕСЕРТ С КУРИЦЕЙ</td>
                            </tr>
                            <tr>
                                <td><b className="p-2">Широта:</b></td>
                                <td className="p-2">59.9999221</td>
                            </tr>
                            <tr>
                                <td><b className="p-2">Долгота:</b></td>
                                <td className="p-2">30.22222222</td>
                            </tr>

                            <tr>
                                <td><Button href="#Desc">К описанию</Button></td>
                                <td><Button href="#Hint">К подсказке</Button></td>
                            </tr>

                        </table>

                    </div>
                </Row>


                <h3 id="Desc">Описание</h3>
                <p>
                    Что нужно делать, чтобы справиться с ужином? Искать курицу. Она сама угадывает ваш аппетит, пока вы возлежите. Вкусно и быстро готовится, не воняет, не жмет спину

                    Бульон куриного или грибного происхождения вскипятить в половине кастрюльи. Грибы весом в 2 кг перетирают с пшеном. Пол литра сливок вскипятите. На крупной терке сделать плавление пюрешки. Будьте осторожны: существует поверье, что если бросить в вареное яйцо песок и соль, оно разрушит стены вашей квартиры, и придет в непригодность до наступления весны. Каши быстрого приготовления, разведенные уксусом - идеальный вариант начинки. Для пущего удешевления можно вместо картофеля сделать блины. Сверху кладем сало, посыпаем сыром.
                </p>


                <h3 id="Hint">Подсказка
                    <Button
                        className="p-2"
                        aria-controls="hint-text"
                        aria-expanded={this.state.show_hint}
                        onClick={() => { this.setState({ show_hint: !this.state.show_hint }) }}
                    >
                        {this.state.show_hint ? "Спрятать" : "Показать"}

                    </Button>
                </h3>

                <Fade in={this.state.show_hint}>
                    <p id="hint-text">
                        Что нужно делать, чтобы справиться с ужином? Искать курицу. Она сама угадывает ваш аппетит, пока вы возлежите. Вкусно и быстро готовится, не воняет, не жмет спину

                        Бульон куриного или грибного происхождения вскипятить в половине кастрюльи. Грибы весом в 2 кг перетирают с пшеном. Пол литра сливок вскипятите. На крупной терке сделать плавление пюрешки. Будьте осторожны: существует поверье, что если бросить в вареное яйцо песок и соль, оно разрушит стены вашей квартиры, и придет в непригодность до наступления весны. Каши быстрого приготовления, разведенные уксусом - идеальный вариант начинки. Для пущего удешевления можно вместо картофеля сделать блины. Сверху кладем сало, посыпаем сыром.
                    </p>
                </Fade>


            </Container >


        )
    }
}