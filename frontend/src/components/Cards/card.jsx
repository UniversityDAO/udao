import "./card.css"
import { useState } from 'react';
import ThumbsUp from "../../thumbUp.svg"
import ThumbsDown from "../../thumbDown.svg"

import { vote } from "../../data/EthersApi"
import { GOV_ABI, GOV_ADDRESS } from "../../data/config";

function Card(props) {
    let proposal = props.proposal;

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-header">{proposal.metadata.title}</h2>
                <p className="card-text"><small><small><em>{"Description: " + proposal.metadata.desc}</em></small></small></p>
                <div className="row">
                    <div className="col-2 thumbBox">
                        <img src={ThumbsUp} className="thumb" /> 
                    </div>
                    <div className="col-2">
                        <p><small><strong>{proposal.votes.forVotes}</strong></small></p>
                    </div>
                    <div className="col-2 thumbBox">
                        <img src={ThumbsDown} className="thumb"/>
                    </div>
                    <div className="col-2">
                        <p><small><strong>{proposal.votes.againstVotes}</strong></small></p>
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
                        {/* need to handle voting > 1: error handling or remove vote button and move to "voted proposals" */}
                        <button className="btn btn-primary" onClick={() => vote([GOV_ADDRESS, GOV_ABI, props.provider], proposal.event.proposalId, 1, "")} style={{marginLeft:"20px", backgroundColor: "Green"}}>
                            Vote Yes
                        </button>
                        <button className="btn btn-primary" onClick={() => vote([GOV_ADDRESS, GOV_ABI, props.provider], proposal.event.proposalId, 0, "")} style={{marginLeft:"20px", backgroundColor: "Red"}}>
                            Vote No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Card;