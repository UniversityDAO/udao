import loading from "../../public/EclipseLoading.svg"

function Loading () {
    return (
        <div className="loading" style={{marginTop: "30px"}}>
            <img src={loading}/>
        </div>
    )
}

export default Loading;
