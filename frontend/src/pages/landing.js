import { Link } from "react-router-dom";
import React from "react";

import { useSelector } from "react-redux";

import "./styling/landing.css";
function Landing() {
    let loading = useSelector(state => state.isLoading);

    function HandleLink() {
        if (loading) {
            return (<Link className="btn landing-button" to="/Loading">Launch App</Link>)
        }
        else {
            return (<Link className="btn landing-button" to="/Dashboard">Launch App</Link>)
        }
    }
    
    return (
        <div className="landing-page">
            <div className="landing-content">
                    <h1 className="display-1 animate-character">University DAO</h1>
                    <HandleLink/>
            </div>
        </div>
    )
}



export default Landing;