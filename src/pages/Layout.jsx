import React from "react"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "../components/Navbar"
import Dashboard from "./Dashboard";
import Help from "./Help";
import Proposals from "./Proposals"
import NewProposal from "./NewProposal"
import ViewProposal from "./ViewProposal";

function Layout() {
  return (
    <Router>
        <Navbar/>
        <main>
          <div className="ml-72 p-5 pt-0 pb-0 flex flex-col flow-col">
            <Routes>
              <Route path="/dashboard" element={<Dashboard/>}></Route>
              <Route path="/grants" element={<Proposals name="Grants"/>}></Route>
              <Route path="/help" element={<Help/>}></Route>
              <Route path="/proposals" element={<Proposals name="Proposals"/>}></Route>
              <Route path="/new_proposal" element={<NewProposal name="Proposal" hidden={true}/>}></Route>
              <Route path="/new_grant" element={<NewProposal name="Grant"/>}></Route>
              <Route path="/view_proposal" element={<ViewProposal name="Proposal"/>}></Route>
            </Routes>
          </div>
        </main>
    </Router>
  )
}

export default Layout