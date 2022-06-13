import GrantApp from "../components/Applications/GrantApp";
import Navbar from "../components/Navbar/navbar";
import "./styling/common.css";


function GrantsApp () {
    return (
    <div class="container-fluid">
        <Navbar />
        <div class="container-fluid App-content">
            <div className="App">
                <form>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Name</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Please enter first and last name"></input>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1" placeholder="Description of the proposal">Description</label>
                        <textarea type="text" class="form-control" id="exampleFormControlTextarea1" placeholder="Describe your proposal"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Grant Amount</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="How money money is needed for your project?"></input>
                    </div>
                    <button class="btn btn-primary">Submit Proposal</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default GrantsApp;