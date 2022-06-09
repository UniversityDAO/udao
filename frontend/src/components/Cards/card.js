import "./card.css"

function Card(props) {
    return (
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{props.title}</h5>
                <p class="card-text">{props.desc}</p>
                <div class="row">
                    <p>Yay: {props.yes} Nay: {props.no}</p>
                </div>
                <p class="btn btn-primary">{props.tags}</p>
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