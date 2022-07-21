import TitleCard from "../components/Cards/titlecard";
import GrantCard from "../components/Cards/grantCard";
import GBanner from "../components/Banners/banner2"
import Loading from "../components/Loading/loading";

import { getGrants } from "../data/UDAOApi";
import { useEffect, useState } from 'react';

import "./styling/common.css"

export default function Grants(props) {
  
    let activeGrants = props.activeGrants;
    let inactiveGrants = props.inactiveGrants;
    const [cardTitle, setCardTitle] = useState("Active Grants");

    function FilterGrants(props) {
        const status=props.status;
        if (status === "Active Grants") {
            return (
                activeGrants.map(grant => {
                    return <GrantCard title={grant.title} desc={grant.desc} amount={grant.amount} yesVotes={grant.yesVotes} noVotes={grant.noVotes} active={grant.active}/>
                })
            )
        }
        else if (status === "Inactive Grants") {
            return (
                inactiveGrants.map(grant => {
                    return <GrantCard title={grant.title} desc={grant.desc} amount={grant.amount} yesVotes={grant.yesVotes} noVotes={grant.noVotes} active={grant.active}/>
                })
            )
        }
        /*else if (status === "My Grants") {
            return (
                myGrants.map(grant => {
                    return <GrantCard title={grant.title} desc={grant.desc} amount={grant.amount} yesVotes={grant.yesVotes} noVotes={grant.noVotes} active={grant.active}/>
                })
            )
        }*/
    }

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
    <div className="container-fluid">
        <div className="container-fluid App-content">
            <div className="App">
                <GBanner updateTitle={updateTitle} 
                    name = "Grants" 
                    btn1 = "Current Round" 
                    l1="/Grants" 
                    btn2 = "Past Rounds" 
                    btn3 = "My Grants" 
                    btn4 = "Apply For Grant" 
                    l4="/Grants/Application"/>
                <div className="row">
                    <div className="col-10">
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
