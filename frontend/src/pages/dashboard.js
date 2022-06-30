import Banner from '../components/Banners/banner';
import TitleCard from '../components/Cards/titlecard';
import Card from '../components/Cards/card';
import GrantCard from '../components/Cards/grantCard';
import Loading from '../components/Loading/loading';

import "./styling/common.css";
import "./styling/dashboard.css"
import {getProposals, getGrants} from "../data/UDAOApi"
import { useState, useEffect } from 'react'

function Dashboard() {
    const [grantData, setGrantData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [activeGrants, setActiveGrants] = useState([]);
    const [proposalData, setProposalData] = useState([]);
    const [activeProposals, setActiveProposals] = useState([]);
    
    function FilterProposals() {
        if (isLoading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                activeProposals.map(proposal => {
                    return <Card title={proposal.title} desc={proposal.desc} yesVotes={proposal.yesVotes} noVotes={proposal.noVotes} active={proposal.active} tags={proposal.tags} />
                })
            )
        }
    }
    
    function FilterGrants() {
        if (isLoading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                activeGrants.map(grant => {
                    return <GrantCard title={grant.title} desc={grant.desc} amount={grant.amount} yesVotes={grant.yesVotes} noVotes={grant.noVotes} active={grant.active} tags={grant.tags} />
                }))
        }
    }

    useEffect(() => {
        async function retrieveData() {
            try{
                const allProposals = await getProposals();
                setProposalData(allProposals);
                const allGrants = await getGrants();
                setGrantData(allGrants);
                setLoading(false);
            }
            catch(err){
                console.log(`An error occurred retrieving the grants: ${err.message}`);
            }
        }
        console.log("Now retrieving all the data");
        retrieveData();
    }, [])
    
    useEffect (() => {
            try{
                setActiveGrants(grantData.filter(g => g.active));
                setActiveProposals(proposalData.filter(p => p.active));
            }
            catch(err){
                console.log(`An error occurred sorting the grants: ${err.message}`);
            }
            
        
    }, [grantData, proposalData])

    return (
    <div class="container-fluid">
        <div class="container-fluid App-content">
            <div className="App">
                <div class="row">
                    <div class="col-12">
                        <Banner name1="Total Supply" name2="Active Proposals" name3="Active Grants" supply="69420/69420" proposals={activeProposals.length} grants={activeGrants.length}/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <TitleCard cardTitle="Active Proposals"/>
                        <ul>
                            <FilterProposals />
                        </ul>
                    </div>
                    <div class="col-6">
                        <TitleCard cardTitle="Active Grants"/>
                        <ul>
                            <FilterGrants />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Dashboard;