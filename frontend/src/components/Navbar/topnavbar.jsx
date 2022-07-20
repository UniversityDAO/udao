import "../../pages/styling/dashboard.css";

import MetamaskConnect from "../Buttons/MetamaskConnect";

function TopNavbar () {
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="nav-header">
            <MetamaskConnect />
        </div>
    </nav>
    )
}

export default TopNavbar;