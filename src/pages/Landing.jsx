import React from "react"
import { Link } from "react-router-dom";

import "../css/Landing.css";

function Landing() {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="flex flex-col justify-center items-center">
          <h1 className="display-1 animate-character">University DAO</h1>
          <Link className="transition-all duration-200 mr-5 w-72 h-10 flex justify-center items-center rounded-lg text-2xl bg-purple hover:bg-hover-purple" to={"/dashboard"}>Launch App</Link>
        </div>
      </div>
    </div>
  )
}

export default Landing;
