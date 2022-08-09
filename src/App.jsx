import React from "react";
import "./App.css"
import Install from "./components/Install";
import Landing from "./pages/Landing";
import NavbarLayout from "./pages/NavbarLayout";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import Proposals from "./pages/Proposals"
import NewProposal from "./pages/NewProposal"
import ViewProposal from "./pages/ViewProposal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/app" element={<NavbarLayout/>}>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="grants" element={<Proposals name="Grants"/>}/>
          <Route path="help" element={<Help/>}/>
          <Route path="proposals" element={<Proposals name="Proposals"/>}/>
          <Route path="new_proposal" element={<NewProposal name="Proposal" hidden={true}/>}/>
          <Route path="new_grant" element={<NewProposal name="Grant"/>}/>
          <Route path="view_proposal" element={<ViewProposal name="Proposal"/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
