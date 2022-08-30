import React, {useEffect} from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from 'react-redux';

import * as web3Storage from '../api/web3StorageAPI'
import { propose } from "../api/EthersApi"
import { GOV_ABI, GOV_ADDRESS } from "../data/config";
import { ProposalMetadata } from '../data/classes';

function NewProposalLayout(props) {
    const provider = useSelector(state => state.metamaskProvider);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [error, setError] = useState(false);

    let loading = false;

    useEffect(() => {
        document.title = "UDAO - New " + props.name;
    }, []);

    useEffect(() => {
        if (error) {
            //TODO: add better error handling
            alert("Title and description cannot be blank.");
            setError(false);
        }
    }, [error]);

    const hideAmountInput = props.hidden;

    async function submitApp() {
        if (title === "" || desc === "") {
            setError(true);
        } else {
            let metadata = new ProposalMetadata(title, desc, false);
            let jsonFile = makeFileObjects(metadata);
            let slicedString = title.slice(0, 8);

            // TODO: find way to get cid w/o uploading. then wait for blockchain txn to confirm
            // first before then finalling uploading to IPFS (or else we might have files in limbo)
            let ipfs_cid = await web3Storage.upload(jsonFile, `Proposal-${slicedString}`, true);

            // create a proposal on blockchain
            let proposal_id = await propose([GOV_ADDRESS, GOV_ABI, provider], ipfs_cid);
            // can now do something with proposal_id, like fetch and render or something

            // TODO: add proposal submit message and redirect back to dashboard or something
            return (
                <Navigate to="/submitting_proposal"/>
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
        <> 
        <div className="flex flex-col p-5 mb-5 rounded-lg bg-black">
            <h1 className="text-3xl mb-2.5">Create New {props.name}</h1>
            <h1 className="text-2xl mb-2">Name</h1>
            <input onChange={e => setTitle(e.target.value)} className="text-2xl mb-5 p-1 rounded-lg bg-gray focus:outline-0 focus:shadow-none" maxLength={100} placeholder="Name goes here"></input>
            <h1 className="text-2xl mb-2">Description</h1>
            <textarea onChange={e => setDesc(e.target.value)} className="resize-none flex-grow text-2xl mb-5 p-1 rounded-lg bg-gray focus:outline-0 focus:shadow-none" placeholder="Description goes here"></textarea>
            <div style={{display: (hideAmountInput ? "none" : "block")}}>
            <h1 className="text-2xl mb-2">Amount Requesting</h1>
            <input className="text-2xl mb-5 p-1 rounded-lg bg-gray focus:outline-0 focus:shadow-none" maxLength={100} placeholder="0" type={"number"}></input>
            </div>
            <h1 className="text-2xl mb-2">Submit {props.name}</h1>
            <div className="flex">
            <Link className="mr-5 w-72 h-10 flex justify-center items-center rounded-lg text-2xl bg-purple hover:bg-hover-purple" to={"/" + props.name.toLowerCase() + "s"}>Back</Link>
            <button onClick={() => submitApp()} className="w-72 h-10 flex justify-center items-center rounded-lg text-2xl bg-purple hover:bg-hover-purple">Submit {props.name}</button>
            </div>
        </div>
        </>
    )
}

export default NewProposalLayout
