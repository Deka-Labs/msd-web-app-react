import { Button, Container, Form } from "react-bootstrap"

function SignUp(): JSX.Element {
    return (
        <Container className="d-flex align-items-center justify-content-center md-auto">
            <Form>
                <Form.Group controlId="login" className="py-2">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control type="text" required placeholder="Введите имя" maxLength={59}></Form.Control>
                </Form.Group>

                <Form.Group controlId="email" className="py-2">
                    <Form.Label>Email адрес</Form.Label>
                    <Form.Control type="email" required placeholder="Введите email" maxLength={119}></Form.Control>
                </Form.Group>

                <Form.Group controlId="password" className="py-2">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" required placeholder="Введите пароль"></Form.Control>
                </Form.Group>
                <Button type="submit" className="w-100">
                    Зарегистрироваться
                </Button>


            </Form>
        </Container>
    )
}

export default SignUp