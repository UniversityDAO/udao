import Navbar from "../components/Navbar/navbar";
import { Link } from "react-router-dom";
import "./styling/common.css";

import { useState } from 'react'
import { Web3Storage } from "web3.storage";

function GrantsApp () {

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [amount, setAmount] = useState("")
    const [jsonObject, setJsonObject] = useState({});

    function submitApp() {
        if (name === "" || desc === ""|| amount === "")
        {
            console.log("Not all fields have been filled out")
        }
        else {
            setJsonObject(jsonObject["Grant Title"] = name)
            setJsonObject(jsonObject["Grant Description"] = desc)
            setJsonObject(jsonObject["Grant Amount"] = amount)
            console.log(JSON.stringify(jsonObject));
            storeFiles(makeFileObjects(jsonObject));
        }
    }

    function getAccessToken() {
        // Testing token
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweENmOUUyRjI3MzQ0ZTFmQzU5QzEzNDg5RDc4NDRBRjQ4N0ZGMEYwRUUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTU1NzI5NzU2NjQsIm5hbWUiOiJEQU9Ub2tlbiJ9.xfAGJ0lBKio5FU66gQLbHpNfhJtibz8UBmlKY-RhA0g'
    
        //return process.env.WEB3STORAGE_TOKEN
    }
    
    function makeStorageClient() {
        return new Web3Storage({ token: getAccessToken() })
    }

    function makeFileObjects (obj) {
        const blob = 
            new Blob([JSON.stringify(obj)], { type: 'application/json'})
        const files = [
            new File([blob], 'ProposalTest.json')
        ]
        return files;
    }

    async function storeFiles (files) {
        const client = makeStorageClient()
        const cid = await client.put(files)
        console.log('stored files with cid:', cid)
        return cid;
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
                        <label for="exampleFormControlInput1">Name</label>
                        <input type="text" name="GrantName" onChange={e => setName(e.target.value)}class="form-control" id="exampleFormControlInput1" placeholder="Please enter first and last name"></input>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1" placeholder="Description of the proposal">Description</label>
                        <textarea type="text" name="GrantDesc" onChange={e => setDesc(e.target.value)} class="form-control" id="exampleFormControlTextarea1" placeholder="Describe your proposal"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Grant Amount</label>
                        <input type="text" name="GrantAmount" onChange={e => setAmount(e.target.value)} class="form-control" id="exampleFormControlInput1" placeholder="How money money is needed for your project?"></input>
                    </div>
                    <button class="btn btn-primary" type="button" onClick={submitApp}>Submit Proposal</button>
                </>
            </div>
        </div>
    </div>
    )
}

export default GrantsApp;