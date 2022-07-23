import loading from "../../EclipseLoading.svg"
import "./loading.css"

function Loading () {
    return (
        <div className="loading" style={{marginTop: "30px"}}>
            <img src={loading}/>
        </div>
    )
}

export default Loading;
