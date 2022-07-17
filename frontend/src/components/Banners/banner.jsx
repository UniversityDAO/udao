import "./banner.css";
import "../../pages/styling/common.css"

function Banner(props) {
    return (
        <div className="custom-banner">
            <div className="row">
                <div className="col">
                    <h1 className="text-primary font-weight-bold">{props.name1}</h1>
                    <h1 className="text-primary font-italic">{props.supply}</h1>
                </div>
                <div className="col">
                    <h1 className="text-primary font-weight-bold">{props.name2}</h1>
                    <h1 className="text-primary font-italic">{props.proposals}</h1>
                </div>
                <div className="col">
                    <h1 className="text-primary font-weight-bold">{props.name3}</h1>
                    <h1 className="text-primary font-italic">{props.grants}</h1>
                </div>
            </div>
        </div>
    )
}

export default Banner;