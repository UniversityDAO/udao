import "./card.css"
import { useState } from 'react';

function Card(props) {
    const [yesVotes, setYesVotes] = useState(props.yesVotes);
    const [noVotes, setNoVotes] = useState(props.noVotes);

    return (
        <div class="card">
            <div class="card-body">
                <h2 class="card-header">{props.title}</h2>
                <p class="card-text"><small>{"Description: " + props.desc}</small></p>
                <div class="row">
                    <p><small>Yes: {yesVotes} No: {noVotes}</small></p>
                    <button class="btn btn-primary" onClick={() => setYesVotes(yesVotes + 1)} style={{marginLeft:"20px", backgroundColor: "Green"}}>
                        Vote Yes
                    </button>
                    <button class="btn btn-primary" onClick={() => setNoVotes(noVotes + 1)} style={{marginLeft:"20px", backgroundColor: "Red"}}>
                        Vote No
                    </button>
                </div>
                <div class="row">
                    <ul>
                        {props.tags.map(tag => {
                            return <button class="btn btn-primary" style={{marginRight:"20px"}}>{tag}</button> 
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}



export default Card;