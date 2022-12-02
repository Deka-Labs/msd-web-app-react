import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

function Layout(): JSX.Element {
    return (
        <div>
            <Navigation />
            <Outlet />
        </div>

    )
}

export default Layout;