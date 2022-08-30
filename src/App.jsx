import React, { useEffect } from "react";
import "./App.css"
import Install from "./components/Install";
import Landing from "./pages/Landing";
import NavbarLayout from "./pages/NavbarLayout";
import { Routes, Route, HashRouter} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import Proposals from "./pages/Proposals"
import NewProposal from "./pages/NewProposal"
import ViewProposal from "./pages/ViewProposal";
import SubmittingProposal from "./pages/SubmittingProposal";

import { useDispatch } from 'react-redux/es/exports'

import { ethers } from 'ethers';
import { GOV_ADDRESS, NFT_ADDRESS } from "./data/config";
import { GOV_ABI, NFT_ABI } from "./data/config";

import { getAllProposals } from "./api/UDAOApi";
import {setAlchemyProvider, setMetamaskProvider, setActiveGrants, setInactiveGrants, setActiveProposals, setInactiveProposals, setLoading} from "../reduxActions"
import { ALCHEMY_KEY } from './data/config'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    // alchemy provider can only read from blockchain. need b/c we want people w/o metamask to be able
    // to view the site
    const alchemy_provider = new ethers.providers.AlchemyProvider("matic", ALCHEMY_KEY);
    dispatch(setAlchemyProvider(alchemy_provider))

    // metamask provider provides write functionality
    // TODO: may need to connect wallet first? need to request accounts?
    // TODO: need to refactor this, will throw error and not load app if no metamask
    const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
    dispatch(setMetamaskProvider(metamaskProvider))

    async function loadApp() {
      let allProposals = await getAllProposals(GOV_ADDRESS, GOV_ABI, alchemy_provider);

      let proposals = allProposals.filter(p => p.metadata.isGrant === false);
      let grants = allProposals.filter(g => g.metadata.isGrant === true);
      
      dispatch(setActiveProposals(proposals.filter(p => p.state === 1)));
      dispatch(setInactiveProposals(proposals.filter(p => p.state !== 1)));

      dispatch(setActiveGrants(grants.filter(g => g.state === 1)));
      dispatch(setInactiveGrants(grants.filter(g => g.state !== 1)));

      dispatch(setLoading(false));
    }

    loadApp();
  }, [])

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route element={<NavbarLayout/>}>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/grants" element={<Proposals name="Grants"/>}/>
            <Route path="/help" element={<Help/>}/>
            <Route path="/proposals" element={<Proposals name="Proposals"/>}/>
            <Route path="/new_proposal" element={<NewProposal name="Proposal" hidden={true}/>}/>
            <Route path="submitting_proposal" element={<SubmittingProposal />} />
            <Route path="/new_grant" element={<NewProposal name="Grant"/>}/>
            <Route path="/view_proposal" element={<ViewProposal name="Proposal"/>}/>
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App;
