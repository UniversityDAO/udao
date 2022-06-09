function TitleCard(props) {
    return (
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{props.title}</h5>
            </div>
        </div>
    )
}

export default TitleCard;