import Card from "../components/Cards/card";
import GBanner from "../components/Banners/banner2";
import TitleCard from "../components/Cards/titlecard";
import { useState } from 'react';
import { useLocation } from "react-router";

import "./styling/common.css"


export default function Proposals(props) {
    let activeProposals = props.activeProposals;
    let inactiveProposals = props.inactiveProposals;

    const [cardTitle, setCardTitle] = useState("Active Proposals");

    function FilterProposals(props) {
        const status=props.status;
        if (status === "Active Proposals" && activeProposals.length !== 0) {
            return (
                activeProposals.map(proposal => {
                    return <Card title={proposal.title} desc={proposal.desc} yesVotes={proposal.yesVotes} noVotes={proposal.noVotes} active={proposal.active}/>
                })
            )
        }
        else if (status === "Inactive Proposals" && inactiveProposals.length !== 0) {
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

    return (
    <div className="container-fluid">
        <div className="container-fluid App-content">
            <div className="App">
                <GBanner updateTitle={updateTitle} 
                    name = "Proposals" 
                    btn1 = "Active" 
                    btn2 = "Inactive" 
                    btn3 = "My Proposals" 
                    btn4 = "New Proposal" 
                    l4="/Proposals/Application"/>
                <div className="row">
                    <div className="col-10">
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
