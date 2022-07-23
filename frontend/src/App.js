import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import './App.css';

import { useState } from 'react';

import Grants from './pages/grants';
import Proposals from './pages/proposals';
import Help from './pages/help';
import Landing from './pages/landing';
import Loading from './pages/loading';

import Dashboard from './pages/dashboard';
import ProposalsApp from './pages/proposalsApp';
import GrantsApp from './pages/GrantsApp';

import WithNav from './layouts/WithNav';
import WithoutNav from './layouts/WithoutNav';

import { ethers } from 'ethers';
import { GOV_ADDRESS } from './data/config';
import { GOV_ABI } from './data/config';

import { getAllProposals } from './data/UDAOApi';

function App() {
  const [activeProposals, setActiveProposals] = useState([]);
  const [inactiveProposals, setInactiveProposals] = useState([]);

  const [activeGrants, setActiveGrants] = useState([]);
  const [inactiveGrants, setInactiveGrants] = useState([]);

  const [loading, setLoading] = useState(true);

  const provider = new ethers.providers.JsonRpcProvider();

  async function loadApp() {
    let allProposals = await getAllProposals(GOV_ADDRESS, GOV_ABI, provider);

    let proposals = allProposals.filter(p => p.isGrant === false);
    let grants = allProposals.filter(g => g.isGrant === true);

    setActiveProposals(proposals.filter(p => p.active === 1));
    setInactiveProposals(proposals.filter(p => p.active !== 1));

    setActiveGrants(grants.filter(g => g.active === 1));
    setInactiveGrants(grants.filter(g => g.active !== 1));

    setLoading(false);
  }

  return (
    <>
      <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/" element={<Landing/>} />
            <Route path="/Loading" element={<Loading loading={loading} loadApp={loadApp}/>}/>
          </Route>
          <Route element={<WithNav />} >
            <Route path="/Dashboard" element={<Dashboard activeProposals={activeProposals} inactiveProposals={inactiveProposals} activeGrants={activeGrants} inactiveGrants={inactiveGrants}/>} />
            <Route path="/Proposals" element = {<Proposals activeProposals={activeProposals} inactiveProposals={inactiveProposals}/>}> </Route>
            <Route path="/Proposals/Application" element = {<ProposalsApp/>}> </Route>
            <Route path="/Grants/Application" element = {<GrantsApp/>}> </Route>
            <Route path="/Grants" element = {<Grants activeGrants={activeGrants} inactiveGrants={inactiveGrants}/>}> </Route>
            <Route path="/Help" element = {<Help />}> </Route>
          </Route>
      </Routes>
    </>
  );
}

export default App;
