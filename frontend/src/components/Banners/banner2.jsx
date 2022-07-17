import "./banner.css";
import "../../pages/styling/common.css"
import { Link } from "react-router-dom";
import { useEffect, useRef} from 'react';

function GBanner(props) {

    const ref1=useRef(null);
    const ref2=useRef(null);
    const ref3=useRef(null);

    useEffect (() => {
        const btn1 = ref1.current;
        const btn2 = ref2.current;
        const btn3 = ref3.current;

        btn1.style.border = "4px solid black";

        function changeHighlight(clickedButton){
            console.log(`inside changeHighlight for ${clickedButton}`);
            switch(clickedButton){
                case "btn1":
                    ref1.current.style.border = "4px solid black";
                    ref2.current.style.border = 'none';
                    ref3.current.style.border = 'none';
                    props.updateTitle("Active");
                    break;
                case "btn2":
                    ref1.current.style.border = 'none';
                    ref2.current.style.border = "4px solid black";
                    ref3.current.style.border = 'none';
                    props.updateTitle("Inactive");
                    break;
                case "btn3":
                    ref1.current.style.border = 'none';
                    ref2.current.style.border = 'none';
                    ref3.current.style.border = "4px solid black";
                    props.updateTitle("My");
                    break;
                default:
                    ref1.current.style.border = 'none';
                    ref2.current.style.border = 'none';
                    ref3.current.style.border = 'none';
            }
        }

        btn1.addEventListener('click', () => {
            changeHighlight('btn1');
        });
        btn2.addEventListener('click', () => {
            changeHighlight('btn2');
        });
        btn3.addEventListener('click', () => {
            changeHighlight('btn3');
        });
    });
    
    return (
        <div className="custom-banner">
            <div className="row">
                <h1>{props.name}</h1>
                <div className="col">
                    <button ref={ref1} className="btn btn-primary font-weight-bold">
                        {props.btn1}
                    </button>
                </div>
                <div className="col">
                    <button ref={ref2} className="btn btn-primary font-weight-bold">
                        {props.btn2}
                    </button>
                </div>
                <div class="col">
                    <button ref={ref3} className="btn btn-primary font-weight-bold">
                        {props.btn3}
                    </button>
                </div>
                <div class="col">
                    <Link className="btn btn-primary font-weight-bold" to={props.l4}>
                        {props.btn4}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default GBanner;