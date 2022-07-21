
import { Route} from 'react-router-dom';
import { Routes } from 'react-router-dom';
import './App.css';

import { useState, useEffect } from 'react';

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

import { getProposals, getGrants } from './data/UDAOApi';

function App() {
  const [proposals, setProposals] = useState([]);
  const [activeProposals, setActiveProposals] = useState([]);
  const [inactiveProposals, setInactiveProposals] = useState([]);

  const [grants, setGrants] = useState([]);
  const [activeGrants, setActiveGrants] = useState([]);
  const [inactiveGrants, setInactiveGrants] = useState([]);

  const [loading, setLoading] = useState(true);

  const provider = new ethers.providers.JsonRpcProvider();

  /*useEffect(() => {
    async function retrieveData() {
      let allProposals = await getProposals();
      let allGrants = await getGrants();

      setProposals(allProposals);
      setGrants(allGrants);
    }

    retrieveData();

  }, [])

  useEffect(() => {
    setActiveProposals(proposals.filter(p => p.active === 1));
    setInactiveProposals(proposals.filter(p => p.active !== 1));

    setActiveGrants(grants.filter(g => g.active === 1));
    setInactiveGrants(grants.filter(g => g.active !== 1));

    setLoading(false);
  }, [proposals, grants])*/

  async function loadApp() {
    let allProposals = await getProposals();
    let allGrants = await getGrants();

    setActiveProposals(allProposals.filter(p => p.active === 1));
    setInactiveProposals(allProposals.filter(p => p.active !== 1));

    setActiveGrants(allGrants.filter(g => g.active === 1));
    setInactiveGrants(allGrants.filter(g => g.active !== 1));

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
            <Route path="/Dashboard" element={<Dashboard Provider = {provider} GovAddress = {GOV_ADDRESS} GovAbi = {GOV_ABI} activeProposals={activeProposals} inactiveProposals={inactiveProposals} activeGrants={activeGrants} inactiveGrants={inactiveGrants}/>} />
            <Route path="/Proposals" element = {<Proposals Provider = {provider} GovAddress = {GOV_ADDRESS} GovAbi = {GOV_ABI} activeProposals={activeProposals} inactiveProposals={inactiveProposals}/>}> </Route>
            <Route path="/Proposals/Application" element = {<ProposalsApp/>}> </Route>
            <Route path="/Grants/Application" element = {<GrantsApp/>}> </Route>
            <Route path="/Grants" element = {<Grants Provider = {provider} GovAddress = {GOV_ADDRESS} GovAbi = {GOV_ABI} activeGrants={activeGrants} inactiveGrants={inactiveGrants}/>}> </Route>
            <Route path="/Help" element = {<Help />}> </Route>
          </Route>
      </Routes>
    </>
  );
}

export default App;
