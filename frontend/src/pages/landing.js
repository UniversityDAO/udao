import { Link } from "react-router-dom";
import React from "react";
import "./styling/landing.css"

function Landing() {
    return (
        <div class="landing-content">
            <h1 class="display-1">University DAO</h1>
            <Link class="btn btn-primary" to="/Dashboard">Launch App</Link>
        </div>
    )
}



export default Landing;