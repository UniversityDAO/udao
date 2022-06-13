import "./banner.css";
import "../../pages/styling/common.css"
import { Link } from "react-router-dom";

function GBanner(props) {
    return (
        <div class="custom-banner">
            <div class="row">
                <h1>{props.name}</h1>
                <div class="col">
                    <Link class="btn btn-primary font-weight-bold" to={props.l1}>
                        {props.btn1}
                    </Link>
                </div>
                <div class="col">
                    <Link class="btn btn-primary font-weight-bold" to={props.l2}>
                        {props.btn2}
                    </Link>
                </div>
                <div class="col">
                    <Link class="btn btn-primary font-weight-bold" to={props.l3}>
                        {props.btn3}
                    </Link>
                </div>
                <div class="col">
                    <Link class="btn btn-primary font-weight-bold" to={props.l4}>
                        {props.btn4}
                    </Link>
                </div>
            </div>
        </div>
    )
}

GBanner.defaultProps = {
    name: "Page Title",
    btn1: "Button 1",
    l1: "/Dashboard",
    l2: "/Dashboard",
    l3: "/Dashboard",
    l4: "/Dashboard",
    btn2: "Button 2",
    btn3: "Button 3",
    btn4: "Button 4"
}

export default GBanner;