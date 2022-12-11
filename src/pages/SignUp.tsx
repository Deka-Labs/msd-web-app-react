import { AxiosError, isAxiosError } from "axios"
import { info } from "console"
import React, { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { Navigate, useNavigate } from "react-router-dom"
import { login_service_signup, User, UserCreateInfo } from "../api/login_service"


export default function SignUp() {

    const [state, setState] = useState<UserCreateInfo>({
        login: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    function handleLoginChange(new_login: string) {
        setState({ ...state, login: new_login })
    }

    function handleEmailChange(new_email: string) {
        setState({ ...state, email: new_email })
    }

    function handlePasswordChange(new_pass: string) {
        setState({ ...state, password: new_pass })
    }

    function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        let create_info = state;

        login_service_signup(create_info).then(
            (response) => {
                let user: User = response.data;
                localStorage.setItem("user_id", String(user.id))
                localStorage.setItem("user_name", user.login)
                localStorage.setItem("user_email", user.email)
                localStorage.setItem("password", create_info.password)

                navigate("/")
            }
        ).catch(
            (reason: Error | AxiosError) => {
                if (isAxiosError(reason)) {
                    // Conflict: Means already registred
                    if (reason.response?.status === 409) {
                        alert("Пользователь уже зарегистрирован")
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
                <Form.Group controlId="login" className="py-2">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        placeholder="Введите имя"
                        maxLength={59}
                        value={state.login}
                        onChange={(e) => handleLoginChange(e.currentTarget.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email" className="py-2">
                    <Form.Label>Email адрес</Form.Label>
                    <Form.Control
                        type="email"
                        required
                        placeholder="Введите email"
                        maxLength={119}
                        value={state.email}
                        onChange={(e) => handleEmailChange(e.currentTarget.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password" className="py-2">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        placeholder="Введите пароль"
                        value={state.password}
                        onChange={(e) => handlePasswordChange(e.currentTarget.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" className="w-100">
                    Зарегистрироваться
                </Button>
            </Form>
        </Container>
    )


}

