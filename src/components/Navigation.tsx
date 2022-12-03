
import { Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";


function Navigation(): JSX.Element {
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
                            <Nav.Link href="/" onClick={(_) => localStorage.clear()}>Выйти</Nav.Link>}
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