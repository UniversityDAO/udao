
import Navbar from "../components/Navbar/navbar";
import { Link } from "react-router-dom";
import "./styling/common.css";
import "./styling/applications.css"


function ProposalsApp () {
    return (
    <div class="container-fluid">
        <div class="container-fluid App-content">
            <div className="App">
                <Link to="/Proposals">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16" align="left">
                        <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                </Link>
                <>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Name</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Please enter first and last name"></input>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1" placeholder="Description of the proposal">Description</label>
                        <textarea type="text" class="form-control" id="exampleFormControlTextarea1" placeholder="Describe your proposal"></textarea>
                    </div>
                    <button class="btn btn-primary">Submit Proposal</button>
                </>
            </div>
        </div>
    </div>
    )
}

export default ProposalsApp;