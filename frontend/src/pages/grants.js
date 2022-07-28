import TitleCard from "../components/Cards/titlecard";
import GrantCard from "../components/Cards/grantCard";
import GBanner from "../components/Banners/banner2"
import { useEffect, useState } from 'react';

import "./styling/common.css";

const GrantType = {
    Active: 'Active',
    Inactive: 'Inactive',
    Personal: 'Personal',
}

export default function Grants(props) {
    let activeGrants = props.activeGrants;
    let inactiveGrants = props.inactiveGrants;
    const [cardTitle, setCardTitle] = useState("Active Grants");
    const [grantType, setGrantType] = useState(GrantType.Active);

    useEffect(() => {

    })

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

    if (grantType == GrantType.Active) {
        setGrantType(activeGrants);
    } else if (grantType == GrantType.Inactive) {
        setGrantType(inactiveGrants);
    } else if (grantType == GrantType.Personal) {
        // setGrantType(myGrants);
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
                        l4="/Grants/Application"
                    />
                    <div className="row">
                        <div className="col-10">
                            <TitleCard cardTitle={cardTitle}/>
                            <CardContainer grants={grantType} />
                            
                            {/* <ul>
                                <FilterGrants status={cardTitle} />
                            </ul> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CardContainer = (props) => {
    const grants = props.grants;
    const grantItems = grants.map(grant =>
        <li>
            <GrantCard
                title={grant.title}
                desc={grant.desc} 
                amount={grant.amount} 
                yesVotes={grant.yesVotes} 
                noVotes={grant.noVotes} 
                active={grant.active}
            />
        </li>
    );
    return (
        <ul>{grantItems}</ul>
    );
}
