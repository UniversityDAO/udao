import TitleCard from "../components/Cards/titlecard";
import Card from "../components/Cards/card";
import GBanner from "../components/Banners/banner2"

//import { getGrants } from "../data/api";
import { getGrants, addGrant } from "../data/UDAOApi";
import { useEffect, useState } from 'react';

import "./styling/common.css"

function Grants() {
    console.log("Rendering Grants page now")
    const [grantData, setGrantData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [activeGrants, setActiveGrants] = useState([]);
    const [inactiveGrants, setInactiveGrants] = useState([]);
    const [myGrants, setMyGrants] = useState([])

    const [cardTitle, setCardTitle] = useState("Active Grants");

    function FilterGrants(props) {
        const status=props.status;
        console.log("Inside filter grants")
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
                console.log("Something went wrong");
                break;
        }
    }

    useEffect(() => {
        async function retrieveGrants() {
            try{
                const allGrants = await getGrants();
                setGrantData(allGrants);
            }
            catch(err){
                console.log(`An error occurred retrieving the grants: ${err.message}`);
            }
        }
        console.log("Now retrieving all the grant data");
        retrieveGrants();
    }, [])

    useEffect (() => {
        console.log("Inside use effect")
            try{
                setActiveGrants(grantData.filter(g => g.active));
                setInactiveGrants(grantData.filter(g => !g.active));
                //setLoading(false);
                //updateTitle("Active");
            }
            catch(err){
                console.log(`An error occurred sorting the grants: ${err.message}`);
            }
            
        
    }, [grantData])
    


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