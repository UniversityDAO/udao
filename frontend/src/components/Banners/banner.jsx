import "./banner.css";
import "../../pages/styling/common.css"

function Banner(props) {
    return (
        <div class="custom-banner">
            <div class="row">
                <div class="col">
                    <h1 class="text-primary font-weight-bold">{props.name1}</h1>
                    <h1 class="text-primary font-italic">{props.supply}</h1>
                </div>
                <div class="col">
                    <h1 class="text-primary font-weight-bold">{props.name2}</h1>
                    <h1 class="text-primary font-italic">{props.proposals}</h1>
                </div>
                <div class="col">
                    <h1 class="text-primary font-weight-bold">{props.name3}</h1>
                    <h1 class="text-primary font-italic">{props.grants}</h1>
                </div>
            </div>
        </div>
    )
}

export default Banner;