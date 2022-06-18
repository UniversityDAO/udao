import "./card.css";
import {react} from 'react';

function TitleCard({cardTitle}) {
    return (
        <div class="card">
            <div class="card-body">
                <h5 class="custom-title">{cardTitle}</h5>
            </div>
        </div>
    )
}

export default TitleCard;