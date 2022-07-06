import { Link } from "react-router-dom";
import "./styling/common.css";

import { useState } from 'react'
//import { Web3Storage } from "web3.storage";
import * as web3Storage from '../data/web3StorageAPI'

import AppError from "../components/Errors/AppError";

function GrantsApp () {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [amount, setAmount] = useState("")
    const [jsonObject, setJsonObject] = useState({});
    const [error, setError] = useState(false);

    function submitApp() {
        if (title === "" || desc === ""|| amount === "")
        {
            setError(true);
        }
        else {
            setJsonObject(jsonObject["title"] = title);
            setJsonObject(jsonObject["desc"] = desc);
            setJsonObject(jsonObject["amount"] = amount);
            setJsonObject(jsonObject["yesVotes"] = 0);
            setJsonObject(jsonObject["noVotes"] = 0);
            setJsonObject(jsonObject["active"] = true);
            setJsonObject(jsonObject["tags"] = ["Grant"]);

            console.log(JSON.stringify(jsonObject));
            let jsonFile = makeFileObjects(jsonObject);
            let slicedString = title.slice(0,8)

            web3Storage.upload(jsonFile, `Grant-${slicedString}`);
        }
    }

    function makeFileObjects (obj) {
        const blob = 
            new Blob([JSON.stringify(obj)], { type: 'application/json'})
        const files = [
            new File([blob], 'Grant.json')
        ]
        return files;
    }

    return (
    <div class="container-fluid">
        <div class="container-fluid App-content">
            <div className="App">
                <Link to="/Grants">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16" align="left">
                        <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                </Link>
                <>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Grant Title</label>
                        <input type="text" name="GrantName" onChange={e => setTitle(e.target.value)}class="form-control" id="exampleFormControlInput1" placeholder="Please enter the title of your grant"></input>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1" placeholder="Description of the proposal">Description</label>
                        <textarea type="text" name="GrantDesc" onChange={e => setDesc(e.target.value)} class="form-control" id="exampleFormControlTextarea1" placeholder="Describe your grant"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Grant Amount</label>
                        <input type="text" name="GrantAmount" onChange={e => setAmount(e.target.value)} class="form-control" id="exampleFormControlInput1" placeholder="How money money is needed for your project?"></input>
                    </div>
                    <button class="btn btn-primary" type="button" onClick={submitApp}>Submit Grant</button>
                    {error && <AppError />}
                </>
            </div>
        </div>
    </div>
    )
}

export default GrantsApp;