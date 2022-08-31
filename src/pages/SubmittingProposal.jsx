import Loading from "../components/LoadingSymbol";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GOV_ADDRESS_MUMBAI, GOV_ABI } from "../data/config";

import { upload } from "../api/web3StorageAPI";
import { propose } from "../api/EthersApi";

import { useEffect } from "react";

export default async function SubmittingProposal() {
    let metadata = useSelector(state => state.currentProposalMetadata);
    let title = useSelector(state => state.currentProposalTitle);
    let provider = useSelector(state => state.metamaskProvider);

    console.log(`Metadata is ${metadata}`);

    let jsonFile = makeFileObjects(metadata);

    console.log(`jsonFile is ${jsonFile}`);

    let ipfs_cid = await upload(jsonFile, `Proposal-${title}`, true);
    let proposal_id = await propose([GOV_ADDRESS_MUMBAI, GOV_ABI, provider], ipfs_cid);

    function makeFileObjects (obj) {
        const blob = 
            new Blob([JSON.stringify(obj)], { type: 'application/json'})
        const files = [
            new File([blob], 'Proposal.json')
        ]
        return files;
    }

    function DisplayLoading() {
        if (!(ipfs_cid && proposal_id)) {
            return (
            <div className="mb-5 mr-5 p-5 w-full h-full flex flex-col rounded-lg bg-black">
                <p className="text-3xl">Proposal Currently Submitting...</p>
                <Loading />
            </div>
            )
        }
        else {
            return (
                <div className="mb-5 mr-5 p-5 w-full h-full flex flex-col rounded-lg bg-black">
                <p className="text-3xl">Proposal is now on the blockchain</p>
                <Link to="/proposals">
                    <button>Click here to return to proposals</button>
                </Link>
              </div>
            )
        }
    }

    return (
        <div>
            <DisplayLoading/>
        </div>
    )
}