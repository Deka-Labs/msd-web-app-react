
import { AxiosError, isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { login_service_get_name } from "../api/login_service";


function Navigation(): JSX.Element {

    const [user, setUser] = useState<string | null>(null);


    const location = useLocation().pathname;

    const is_home = location === '/';
    const is_cache = location === '/cache';
    const is_my_cache =
        location === '/cache/my' ||
        location === '/cache/add' ||
        location === '/cache/edit';

    const is_login = location === '/login'
    const is_signup = location === '/signup'

    const user_loggedin = !!localStorage.getItem("user_id")

    useEffect(() => {
        let uid = localStorage.getItem("user_id")
        if (uid) {
            login_service_get_name(parseInt(uid)).then(
                (r) => {
                    let user_name = r.data;
                    setUser(user_name.login)
                }
            ).catch(
                (reason: Error | AxiosError) => {
                    if (isAxiosError(reason)) {
                        if (reason.response?.status === 404) {
                            alert("Пользователь, под которым вы вошли был удален")
                            localStorage.clear()
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
    }, [])


    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Navbar.Brand className="mx-4" href="#">КАРТофель</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-4" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link active={is_home} href="/">Домой</Nav.Link>
                        <Nav.Link active={is_cache} href="/cache">Тайники</Nav.Link>
                        {user_loggedin &&
                            <Nav.Link active={is_my_cache} href="/cache/my">Мои тайники</Nav.Link>
                        }

                    </Nav>
                    <Nav>
                        {user_loggedin &&
                            <>
                                {
                                    user && <Nav.Link active>Вы вошли как {user}</Nav.Link>
                                }
                                <Nav.Link href="/" onClick={(_) => localStorage.clear()}>Выйти</Nav.Link>
                            </>
                        }
                        {!user_loggedin &&
                            <>
                                <Nav.Link active={is_login} href="/login">Войти</Nav.Link>
                                <Nav.Link active={is_signup} href="/signup">Зарегистрироваться</Nav.Link>
                            </>
                        }



                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header >
    )
}

export default Navigation;