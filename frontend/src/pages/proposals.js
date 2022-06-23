import Card from "../components/Cards/card";
import GBanner from "../components/Banners/banner2";
import TitleCard from "../components/Cards/titlecard";
import { useState } from 'react';

import { getProposals } from "../data/api";

const proposalData = getProposals();

const activeProposals = proposalData.filter(p => p.active);
const inactiveProposals = proposalData.filter(p => !p.active);
const myProposals = [];

export default function Proposals() {

    const [cardTitle, setCardTitle] = useState("Active Proposals");

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

    function FilterProposals(props) {
        const status=props.status;
        if (status === "Active Proposals") {
            return (
                activeProposals.map(proposal => {
                    return <Card title={proposal.title} desc={proposal.desc} yesVotes={proposal.yesVotes} noVotes={proposal.noVotes} active={proposal.active} tags={proposal.tags} />
                })
            )
        }
        else if (status === "Inactive Proposals") {
            return (
                inactiveProposals.map(proposal => {
                    return <Card title={proposal.title} desc={proposal.desc} yesVotes={proposal.yesVotes} noVotes={proposal.noVotes} active={proposal.active} tags={proposal.tags} />
                })
            )
        }
        else if (status === "My Proposals") {
            return (
                myProposals.map(proposal => {
                    return <Card title={proposal.title} desc={proposal.desc} yesVotes={proposal.yesVotes} noVotes={proposal.noVotes} active={proposal.active} tags={proposal.tags} />
                })
            )
        }
    }

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
