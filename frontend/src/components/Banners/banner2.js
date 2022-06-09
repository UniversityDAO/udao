import "./banner.css";
import "../../pages/styling/common.css"

function GBanner(props) {
    return (
        <div class="custom-banner">
            <div class="row">
                <h1>{props.name}</h1>
                <div class="col">
                    <h1 class="btn btn-primary font-weight-bold">{props.btn1}</h1>
                </div>
                <div class="col">
                    <h1 class="btn btn-primary font-weight-bold">{props.btn2}</h1>
                </div>
                <div class="col">
                    <h1 class="btn btn-primary font-weight-bold">{props.btn3}</h1>
                </div>
                <div class="col">
                    <h1 class="btn btn-primary font-weight-bold">{props.btn4}</h1>
                </div>
            </div>
        </div>
    )
}

GBanner.defaultProps = {
    name: "Page Title",
    btn1: "Button 1",
    btn2: "Button 2",
    btn3: "Button 3",
    btn4: "Button 4"
}

export default GBanner;