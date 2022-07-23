import { Link } from "react-router-dom";
import React from "react";

import "./styling/landing.css";
function Landing() {
    return (
        <div className="landing-page">
            <div className="landing-content">
                    <h1 className="display-1 animate-character">University DAO</h1>
                    <Link className="btn landing-button" to="/Loading">Launch App</Link>
            </div>
        </div>
    )
}



export default Landing;