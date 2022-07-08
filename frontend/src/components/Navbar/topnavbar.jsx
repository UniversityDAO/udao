import "../../pages/styling/dashboard.css";

import MetamaskConnect from "../Buttons/MetamaskConnect";

function TopNavbar () {
    return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="nav-header">
            <MetamaskConnect />
        </div>
    </nav>
    )
}

export default TopNavbar;