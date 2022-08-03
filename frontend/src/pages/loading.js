import Loading from "../components/Loading/loading";
import "./styling/loading.css"

import { Navigate } from 'react-router'
import { useEffect, useState } from "react";

import { ethers } from 'ethers';
import { GOV_ADDRESS } from '../data/config';
import { GOV_ABI } from '../data/config';
import { getAllProposals } from '../data/UDAOApi';

export default function LoadingPage() {
    const [loading, setLoading] = useState(true);
    const [provider, setProvider] = useState(null);

    const [activeProposals, setActiveProposals] = useState([]);
    const [inactiveProposals, setInactiveProposals] = useState([]);
    const [activeGrants, setActiveGrants] = useState([]);
    const [inactiveGrants, setInactiveGrants] = useState([]);

    useEffect(() => {
        async function configureProvider() {
            // metamask as provider
            // const provider = new ethers.providers.Web3Provider(window.ethereum);

            // localhost as provider
            // const provider = new ethers.providers.JsonRpcProvider();

            // alchemy as provider
            const provider = new ethers.providers.AlchemyProvider("maticmum", process.env.ALCHEMY_API_KEY);
            setProvider(provider);
        }
        configureProvider();
    }, []);

    useEffect(() => {
        async function loadApp() {
            if (provider) {
                let allProposals = await getAllProposals(GOV_ADDRESS, GOV_ABI, provider);

                let proposals = allProposals.filter(p => p.isGrant === false);
                let grants = allProposals.filter(g => g.isGrant === true);
        
                setActiveProposals(proposals.filter(p => p.active === 1));
                setInactiveProposals(proposals.filter(p => p.active !== 1));
        
                setActiveGrants(grants.filter(g => g.active === 1));
                setInactiveGrants(grants.filter(g => g.active !== 1));
        
                // TODO: could be moved if need faster loading
                setLoading(false);
            }
        }

        loadApp();
    }, [provider]);

    return (
        <>
            {loading ?
                <div className="loading-page">
                    <div className="loading-content">
                        <Loading />
                        <span>Loading Data...</span>
                    </div>
                </div> :
                <Navigate to="/Dashboard" replace={true} state={{ activeProposals, inactiveProposals, activeGrants, inactiveGrants }} />
            }
        </>
    )
}
