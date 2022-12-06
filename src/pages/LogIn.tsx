import { AxiosError, isAxiosError } from "axios"
import React from "react"
import { Button, Container, Form } from "react-bootstrap"
import { Navigate } from "react-router-dom"
import { login_service_login, User, UserLoginInfo } from "../api/login_service"

type LogInState = {
    info: UserLoginInfo,
    logged_in: boolean
}

class LogIn extends React.Component<any, LogInState> {
    constructor(props: any) {
        super(props)
        const user_info: UserLoginInfo = {
            email: "",
            password: ""
        }

        this.state = {
            info: user_info,
            logged_in: false
        }

        this.handleChange.bind(this)
        this.handleSubmit.bind(this)
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        switch (event.currentTarget.id) {
            case "email": {
                let new_state = this.state;
                new_state.info.email = event.currentTarget.value;
                this.setState(new_state)
                break;
            }
            case "password": {
                let new_state = this.state;
                new_state.info.password = event.currentTarget.value;
                this.setState(new_state)
                break;
            }
        }
    }


    handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        let create_info = this.state.info;

        login_service_login(create_info).then(
            (response) => {
                let user: User = response.data;
                localStorage.setItem("user_id", String(user.id))
                localStorage.setItem("user_name", user.login)
                localStorage.setItem("user_email", user.email)
                localStorage.setItem("password", create_info.password)

                this.setState(
                    {
                        info: create_info,
                        logged_in: true,
                    }
                )

            }
        ).catch(
            (reason: Error | AxiosError) => {
                if (isAxiosError(reason)) {
                    if (reason.response?.status === 404) {
                        alert("Пользователь не найден")
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


    render() {
        return (
            <Container className="d-flex align-items-center justify-content-center md-auto">
                {this.state.logged_in && <Navigate to="/"></Navigate>}
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Group controlId="email" className="py-2">
                        <Form.Label>Email адрес</Form.Label>
                        <Form.Control
                            type="email"
                            required
                            placeholder="Введите email"
                            maxLength={119}
                            onChange={(e) => this.handleChange(e as any)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password" className="py-2">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            required
                            placeholder="Введите пароль"
                            onChange={(e) => this.handleChange(e as any)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" className="w-100">
                        Войти
                    </Button>

                </Form>
            </Container>
        )
    }


}



export default LogIn