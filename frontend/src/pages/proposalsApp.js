import { useState } from "react";
import { Link } from "react-router-dom";
import * as web3Storage from '../data/web3StorageAPI'
import "./styling/common.css";
import "./styling/applications.css"

import AppError from "../components/Errors/AppError";

import { propose } from "../data/EthersApi"
import { GOV_ABI, GOV_ADDRESS } from "../data/config";
import { ProposalMetadata } from '../data/classes';

function ProposalsApp(props) {
    const provider = props.provider;
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [error, setError] = useState(false);

    async function submitApp() {
        if (title === "" || desc === "") {
            setError(true);
        } else {
            setError(false);
            let metadata = new ProposalMetadata(title, desc, false);
            let jsonFile = makeFileObjects(metadata);

            // TODO: why are indexes hardcoded?
            let slicedString = title.slice(0, 8);

            // TODO: find way to get cid w/o uploading. then wait for blockchain txn to confirm
            // first before then finalling uploading to IPFS (or else we might have files in limbo)
            let ipfs_cid = await web3Storage.upload(jsonFile, `Proposal-${slicedString}`, true);

            // create a proposal on blockchain
            let proposal_id = await propose([GOV_ADDRESS, GOV_ABI, provider], ipfs_cid);
            // can now do something with proposal_id, like fetch and render or something

            return (
                <Link to="/proposals"/>
            )
        }
    }

    function makeFileObjects (obj) {
        const blob = 
            new Blob([JSON.stringify(obj)], { type: 'application/json'})
        const files = [
            new File([blob], 'Proposal.json')
        ]
        return files;
    }

    return (
    <div className="container-fluid">
        <div className="container-fluid App-content">
            <div className="App">
                <Link to="/Proposals">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16" align="left">
                        <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                </Link>
                <form>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Proposal Title</label>
                        <input type="text" name="ProposalTitle" onChange={e => setTitle(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="Please enter the title of your proposal"></input>
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1" placeholder="Description of the proposal">Description</label>
                        <textarea type="text" name = "ProposalDesc" onChange={e => setDesc(e.target.value)} className="form-control" id="exampleFormControlTextarea1" placeholder="Describe your proposal"></textarea>
                    </div>
                    <button className="btn btn-primary" type="button" onClick={submitApp}>Submit Proposal</button>
                    {error && <AppError />}
                </form>
            </div>
        </div>
    </div>
    )
}

//

export default ProposalsApp;