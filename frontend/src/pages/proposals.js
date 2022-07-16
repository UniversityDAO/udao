import Card from "../components/Cards/card";
import GBanner from "../components/Banners/banner2";
import TitleCard from "../components/Cards/titlecard";
import Loading from "../components/Loading/loading";

import { useState, useEffect } from 'react';
import { getProposals } from "../data/UDAOApi";


import "./styling/common.css"

export default function Proposals() {
    const [proposalData, setProposalData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [activeProposals, setActiveProposals] = useState([]);
    const [inactiveProposals, setInactiveProposals] = useState([]);
    const [myProposals, setMyProposals] = useState([]);

    const [cardTitle, setCardTitle] = useState("Active Proposals");

    function FilterProposals(props) {
        const status=props.status;
        if (isLoading) {
            return (
                <Loading />
            )
        }
        else if (status === "Active Proposals" && !isLoading && activeProposals.length !== 0) {
            return (
                activeProposals.map(proposal => {
                    return <Card title={proposal.title} desc={proposal.desc} yesVotes={proposal.yesVotes} noVotes={proposal.noVotes} active={proposal.active}/>
                })
            )
        }
        else if (status === "Inactive Proposals" && !isLoading && inactiveProposals.length !== 0) {
            return (
                inactiveProposals.map(proposal => {
                    return <Card title={proposal.title} desc={proposal.desc} yesVotes={proposal.yesVotes} noVotes={proposal.noVotes} active={proposal.active}/>
                })
            )
        }
        /*else if (status === "My Proposals" && !isLoading) {
            return (
                myProposals.map(proposal => {
                    return <Card title={proposal.title} desc={proposal.desc} yesVotes={proposal.yesVotes} noVotes={proposal.noVotes} active={proposal.active}/>
                })
            )
        }*/
    }

    let updateTitle = (newTitle) => {
        switch(newTitle) {
            case "Active":
                setCardTitle("Active Proposals");
                break;
            case "Inactive":
                setCardTitle("Inactive Proposals");
                break;
            case "My":
                setCardTitle("My Proposals");
                break;
            default:
                break;
        }
    }
    
    useEffect(() => {
        async function retrieveProposals() {
            try{
                let allProposals = await getProposals();
                setProposalData(allProposals);
                setLoading(false);
            }
            catch(err){
                console.log(`An error occurred retrieving the proposals: ${err.message}`);
            }
        }
        retrieveProposals();
    }, []) 

    useEffect (() => {
            try{
                setActiveProposals(proposalData.filter(p => p.active === 1));
                setInactiveProposals(proposalData.filter(p => p.active !== 1));
            }
            catch(err){
                console.log(`An error occurred sorting the proposals: ${err.message}`);
            }
            
        
    }, [proposalData])

    return (
    <div class="container-fluid">
        <div class="container-fluid App-content">
            <div className="App">
                <GBanner updateTitle={updateTitle} 
                    name = "Proposals" 
                    btn1 = "Active" 
                    btn2 = "Inactive" 
                    btn3 = "My Proposals" 
                    btn4 = "New Proposal" 
                    l4="/Proposals/Application"/>
                <div class="row">
                    <div class="col-10">
                        <TitleCard cardTitle={cardTitle}/>
                        <ul>
                            <FilterProposals status={cardTitle} />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
