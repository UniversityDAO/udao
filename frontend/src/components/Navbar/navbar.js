import { Link } from "react-router-dom";
import logo from "../../DaoLogo.svg"
import "./navbar.css";

import MetamaskConnect from "../Buttons/MetamaskConnect";

function Navbar() {
    return (
    <div class="vertical-nav" id="sidebar">
        <div class="py-4 px-3 mb-4">
          <div class="media d-flex align-items-center">{/*<img src="https://bootstrapious.com/i/snippets/sn-v-nav/avatar.png" alt="..." width="65" class="mr-3 rounded-circle img-thumbnail shadow-sm"> </img>*/}
            <div class="media-body">
              <Link to="/Dashboard">
                <img src={logo} className = "daoLogo" to="./Dashboard"/>
              </Link>
            </div>
          </div>
        </div>

      <ul class="nav flex-column bg-white mb-0">
        <li class="nav-item">
          <Link to="/Dashboard" class="nav-link text-dark font-italic bg-light"><i class="fa fa-home mr-3 text-primary fa-fw"></i>Dashboard</Link>  
        </li>
        <li class="nav-item">
          <Link to="/Grants" class="nav-link text-dark font-italic"><i class="fa-solid fa-dollar-sign mr-3 text-primary fa-fw"/>Grants</Link>
        </li>
        <li class="nav-item">
          <Link to="/Proposals" class="nav-link text-dark font-italic"><i class="fa fa-picture-o mr-3 text-primary fa-fw"></i>Proposals</Link>
        </li>
        <li class="nav-item">
          <Link to="/Help" class="nav-link text-dark font-italic"><i class="fa fa-picture-o mr-3 text-primary fa-fw"></i>Help</Link>
        </li>
      </ul>

      <div class="connect-wallet">
        <MetamaskConnect />
      </div>
    </div>
  )
}

export default Navbar;