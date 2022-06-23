import TitleCard from "../components/Cards/titlecard";
import Card from "../components/Cards/card";
import GBanner from "../components/Banners/banner2"

import { getGrants } from "../data/api";
import { useState } from 'react';

import "./styling/common.css"

const grantData = getGrants();

const activeGrants = grantData.filter(g => g.active);
const inactiveGrants = grantData.filter(g => !g.active);
const myGrants = [];

function FilterGrants(props) {
    const status=props.status;
    if (status === "Active Grants") {
        return (
            activeGrants.map(grant => {
                return <Card title={grant.title} desc={grant.desc} yesVotes={grant.yesVotes} noVotes={grant.noVotes} active={grant.active} tags={grant.tags} />
            })
        )
    }
    else if (status === "Inactive Grants") {
        return (
            inactiveGrants.map(grant => {
                return <Card title={grant.title} desc={grant.desc} yesVotes={grant.yesVotes} noVotes={grant.noVotes} active={grant.active} tags={grant.tags} />
            })
        )
    }
    else if (status === "My Grants") {
        return (
            myGrants.map(grant => {
                return <Card title={grant.title} desc={grant.desc} yesVotes={grant.yesVotes} noVotes={grant.noVotes} active={grant.active} tags={grant.tags} />
            })
        )
    }
}

function Grants() {
    
    const [cardTitle, setCardTitle] = useState("Active Grants");

    let updateTitle = (newTitle) => {
        switch(newTitle) {
            case "Active":
                setCardTitle("Active Grants");
                break;
            case "Inactive":
                setCardTitle("Inactive Grants");
                break;
            case "My":
                setCardTitle("My Grants");
                break;
            default:
                break;
        }
    }

    return (
    <div class="container-fluid">
        <div class="container-fluid App-content">
            <div className="App">
                <GBanner updateTitle={updateTitle} name = "Grants" btn1 = "Current Round" l1="/Grants" btn2 = "Past Rounds" btn3 = "My Grants" btn4 = "Apply For Grant" l4="/Grants/Application"/>
                <div class="row">
                    <div class="col-10">
                        <TitleCard cardTitle={cardTitle}/>
                        <ul>
                            <FilterGrants status={cardTitle} />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Grants;