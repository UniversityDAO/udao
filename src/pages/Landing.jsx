import React from "react"
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <p>Landing</p>
      <Link reloadDocument className="mr-5 w-72 h-10 flex justify-center items-center rounded-lg text-2xl bg-purple hover:bg-hover-purple" to={"/app/dashboard"}>Launch App</Link>
    </>
  )
}

export default Landing
