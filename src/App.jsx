import React, { useEffect } from "react";
import "./App.css"
import Landing from "./pages/Landing";
import NavbarLayout from "./pages/NavbarLayout";
import { Routes, Route, HashRouter} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import Proposals from "./pages/Proposals"
import NewProposal from "./pages/NewProposal"
import ViewProposal from "./pages/ViewProposal";
import SubmittingProposal from "./pages/SubmittingProposal";

import { useDispatch, useSelector } from 'react-redux/es/exports'

import { ethers } from 'ethers';
import { GOV_ADDRESS } from "./data/config";
import { GOV_ABI } from "./data/config";

import { getAllProposals } from "./api/UDAOApi";
import {setAlchemyProvider, setMetamaskProvider, setNetwork, setActiveGrants, setInactiveGrants, setActiveProposals, setInactiveProposals, setLoading, setAccount} from "../reduxActions"
import { ALCHEMY_KEY } from './data/config'
import detectEthereumProvider from "@metamask/detect-provider";

function App() {
  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account);

  useEffect(() => {
    async function detectMetamask(currentAccount) {
        // store metamask provider in redux state
        const metamaskProvider = new ethers.providers.Web3Provider(await detectEthereumProvider());
        await dispatch(setMetamaskProvider(metamaskProvider));

        // if user has connected wallet previously, will return the connected account
        // otherwise, will return an empty array
        let accounts = await metamaskProvider.provider.request({ method: 'eth_accounts' });
        await dispatch(setAccount(accounts));

        // check the network
        // detect network and store in redux state
        const chainId = await metamaskProvider.provider.request({ method: 'eth_chainId' });
        dispatch(setNetwork(chainId));

        // register event listeners
        metamaskProvider.provider.on('chainChanged', (chainId) => {
            dispatch(setNetwork(chainId));
            window.location.reload();
        });

        metamaskProvider.provider.on('accountsChanged', (accounts) => {
            // TODO: could extract this code into a function since it is same as in Navbar
            if (accounts.length === 0) {
                // MetaMask is locked or the user has not connected any accounts
                console.log('Please connect to MetaMask.');
            } else if (accounts[0] !== currentAccount) {
                dispatch(setAccount(accounts));
            }
        });
    }
    
    // console.log(currentAccount)
    detectMetamask(currentAccount);
  }, []);

  useEffect(() => {
    // alchemy provider can only read from blockchain. need b/c we want people w/o metamask to be able
    // to view the site
    const alchemy_provider = new ethers.providers.AlchemyProvider("matic", ALCHEMY_KEY);
    dispatch(setAlchemyProvider(alchemy_provider))

    // metamask provider provides write functionality
    // const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);

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
            <Route path="/submitting_proposal" element={<SubmittingProposal />} />
            <Route path="/new_grant" element={<NewProposal name="Grant"/>}/>
            <Route path="/view_proposal" element={<ViewProposal name="Proposal"/>}/>
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App;
