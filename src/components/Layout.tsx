import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import StickyFooter from "./StickyFooter";

function Layout(): JSX.Element {
    return (
        <div className="d-flex flex-column vh-100">
            <Navigation />
            <main className="flex-fill">
                <Outlet />
            </main>
            <StickyFooter />
        </div>

    )
}

export default Layout;