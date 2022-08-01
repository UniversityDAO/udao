import "./card.css"
import { useState } from 'react';
import ThumbsUp from "../../thumbUp.svg"
import ThumbsDown from "../../thumbDown.svg"

import { vote } from "../../data/EthersApi"
import { GOV_ABI, GOV_ADDRESS } from "../../data/config";

function Card(props) {
    const [yesVotes, setYesVotes] = useState(props.yesVotes);
    const [noVotes, setNoVotes] = useState(props.noVotes);

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-header">{props.title}</h2>
                <p className="card-text"><small><small><em>{"Description: " + props.desc}</em></small></small></p>
                <div className="row">
                    <div className="col-2 thumbBox">
                        <img src={ThumbsUp} className="thumb" /> 
                    </div>
                    <div className="col-2">
                        <p><small><strong>{yesVotes}</strong></small></p>
                    </div>
                    <div className="col-2 thumbBox">
                        <img src={ThumbsDown} className="thumb"/>
                    </div>
                    <div className="col-2">
                        <p><small><strong>{noVotes}</strong></small></p>
                    </div>
                    {/*<p><img src={ThumbsUp}/> {yesVotes} <img src={ThumbsDown}/> {noVotes}</p>*/}
                </div>
                <div className="row">
                    {/*<ul>
                        {props.tags.map(tag => {
                            return <button class="btn btn-primary" style={{marginRight:"20px"}}>{tag}</button> 
                        })}
                    </ul>*/}
                    <div className="voting col-10">
                        <button className="btn btn-primary" onClick={vote.vote([GOV_ADDRESS, GOV_ABI, null], 0, "voted yes")} style={{marginLeft:"20px", backgroundColor: "Green"}}>
                            Vote Yes
                        </button>
                        <button className="btn btn-primary" onClick={vote.vote([GOV_ADDRESS, GOV_ABI, null], 0, "voted no")} style={{marginLeft:"20px", backgroundColor: "Red"}}>
                            Vote No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Card;