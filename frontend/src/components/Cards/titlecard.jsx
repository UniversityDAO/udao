import "./card.css";
import {react} from 'react';

function TitleCard({cardTitle}) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="custom-title">{cardTitle}</h5>
            </div>
        </div>
    )
}

export default TitleCard;