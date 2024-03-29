import { AxiosError, isAxiosError } from "axios"
import React, { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { login_service_login, User, UserLoginInfo } from "../api/login_service"

export default function LogIn() {
    const [info, setInfo] = useState<UserLoginInfo>({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    function handleEmailChange(new_email: string) {
        setInfo({ ...info, email: new_email })
    }

    function handlePassChange(new_pass: string) {
        setInfo({ ...info, password: new_pass })
    }

    function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();

        login_service_login(info).then(
            (response) => {
                let user: User = response.data;
                localStorage.setItem("user_id", String(user.id))
                localStorage.setItem("user_name", user.login)
                localStorage.setItem("user_email", user.email)
                localStorage.setItem("password", info.password)

                navigate("/")
            }
        ).catch(
            (reason: Error | AxiosError) => {
                if (isAxiosError(reason)) {
                    if (reason.response?.status === 404) {
                        alert("Пользователь не найден")
                    } else if (reason.response?.status === 403) {
                        alert("Не верный пароль")
                    } else if (reason.response?.status === 400) { // Invalid format
                        alert("Неверный формат данных")
                    } else {
                        alert("Внутреняя ошибка, попробуйте позже")
                        console.log("Status code:", reason.response?.status);
                        console.log("Body:", reason.toJSON());
                    }
                } else {
                    alert(reason)
                }

            }
        );
    }

    return (
        <Container className="d-flex align-items-center justify-content-center md-auto">
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group controlId="email" className="py-2">
                    <Form.Label>Email адрес</Form.Label>
                    <Form.Control
                        type="email"
                        required
                        placeholder="Введите email"
                        maxLength={119}
                        onChange={(e) => handleEmailChange(e.currentTarget.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password" className="py-2">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        placeholder="Введите пароль"
                        onChange={(e) => handlePassChange(e.currentTarget.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" className="w-100">
                    Войти
                </Button>

            </Form>
        </Container>
    )
}

