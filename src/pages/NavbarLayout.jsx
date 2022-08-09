import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

function NavbarLayout() {
  return (
    <>
      <Navbar/>
      <main>
        <div className="ml-72 p-5 pt-0 pb-0 flex flex-col flow-col">
          <Outlet/>
        </div>
      </main>
    </>
  )
}

export default NavbarLayout