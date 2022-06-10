import "./card.css"
import { useState } from 'react';

function Card(props) {
    const [yesVotes, setYesVotes] = useState(0);
    const [noVotes, setNoVotes] = useState(0);

    return (
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{props.title}</h5>
                <p class="card-text">{props.desc}</p>
                <div class="row">
                    <p>Yay: {yesVotes} Nay: {noVotes}</p>
                    <button class="btn btn-primary" onClick={() => setYesVotes(yesVotes + 1)} style={{marginLeft:"20px"}}>
                        Vote Yes
                    </button>
                    <button class="btn btn-primary" onClick={() => setNoVotes(noVotes + 1)} style={{marginLeft:"20px"}}>
                        Vote No
                    </button>
                </div>
                <button class="btn btn-primary">{props.tags}</button>
            </div>
        </div>
    )
}

Card.defaultProps = {
    title: "Title",
    desc: "Description",
    tags: "Tags",
    yes: "0",
    no: "0"
}


export default Card;