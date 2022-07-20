import "./card.css"
import { useState } from 'react';
import ThumbsUp from "../../thumbUp.svg"
import ThumbsDown from "../../thumbDown.svg"

function GrantCard(props) {
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
                </div>
                <div className="row">
                    <p style={{marginTop: "10px"}}> <strong><small>
                        Amount Requested: {props.amount}
                        </small></strong></p>
                </div>
                <div className="row">
                    <div className="voting col-10">
                        <button className="btn btn-primary" onClick={() => setYesVotes(yesVotes + 1)} style={{marginLeft:"20px", backgroundColor: "Green"}}>
                            Vote Yes
                        </button>
                        <button className="btn btn-primary" onClick={() => setNoVotes(noVotes + 1)} style={{marginLeft:"20px", backgroundColor: "Red"}}>
                            Vote No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default GrantCard;