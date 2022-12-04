import { AxiosError, isAxiosError } from "axios"
import React from "react"
import { Button, Container, Form } from "react-bootstrap"
import { Navigate } from "react-router-dom"
import { login_service_signup, User, UserCreateInfo } from "../api/login_service"

type SignupState = {
    info: UserCreateInfo
    signed_up: boolean
}

class SignUp extends React.Component<any, SignupState> {

    constructor(props: any) {
        super(props)
        const user_create_info: UserCreateInfo = {
            login: "",
            email: "",
            password: ""
        }

        this.state = {
            info: user_create_info,
            signed_up: false
        }

        this.handleChange.bind(this)
        this.handleSubmit.bind(this)

    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        switch (event.currentTarget.id) {
            case "login": {
                let new_state = this.state;
                new_state.info.login = event.currentTarget.value;
                this.setState(new_state)
                break;
            }
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

        login_service_signup(create_info).then(
            (response) => {
                let user: User = response.data;
                localStorage.setItem("user_id", String(user.id))
                localStorage.setItem("user_name", user.login)
                localStorage.setItem("user_email", user.email)
                localStorage.setItem("password", create_info.password)

                this.setState(
                    {
                        info: create_info,
                        signed_up: true,
                    }
                )

            }
        ).catch(
            (reason: Error | AxiosError) => {
                if (isAxiosError(reason)) {
                    // Conflict: Means already registred
                    if (reason.response?.status === 409) {
                        alert("Пользователь уже зарегистрирован")
                    } else if (reason.response?.status === 400) { // Invalid format
                        alert("Невреный формат данных")
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
                {this.state.signed_up && <Navigate to="/"></Navigate>}
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Group controlId="login" className="py-2">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            placeholder="Введите имя"
                            maxLength={59}
                            value={this.state.info.login}
                            onChange={(e) => this.handleChange(e as any)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="email" className="py-2">
                        <Form.Label>Email адрес</Form.Label>
                        <Form.Control
                            type="email"
                            required
                            placeholder="Введите email"
                            maxLength={119}
                            value={this.state.info.email}
                            onChange={(e) => this.handleChange(e as any)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="password" className="py-2">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            required
                            placeholder="Введите пароль"
                            value={this.state.info.password}
                            onChange={(e) => this.handleChange(e as any)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" className="w-100">
                        Зарегистрироваться
                    </Button>
                </Form>
            </Container>
        )
    }
}



export default SignUp