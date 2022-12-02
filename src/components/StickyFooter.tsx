import { Container } from "react-bootstrap";


function StickyFooter(): JSX.Element {

    return (
        <footer className="footer mt-auto py-3 bg-light">
            <Container className="d-flex justify-content-end">
                <span>© 2022 Кушаков</span >
            </Container >
        </footer >
    )
}

export default StickyFooter;