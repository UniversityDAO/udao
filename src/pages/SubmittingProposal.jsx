import Loading from "../components/LoadingSymbol";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GOV_ADDRESS, GOV_ABI } from "../data/config";

import { upload } from "../api/web3StorageAPI";
import { propose } from "../api/EthersApi";

import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux/es/exports'
import { setRefresh } from "../../reduxActions";

export default function SubmittingProposal() {
    const dispatch = useDispatch();
    const [ipfsCid, setIpfsCid] = useState("");
    const [proposalId, setProposalId] = useState("");

    let metadata = useSelector(state => state.currentProposalMetadata);
    let title = useSelector(state => state.currentProposalTitle);
    let provider = useSelector(state => state.metamaskProvider);

    useEffect(() => {
        async function submit() {
            let jsonFile = makeFileObjects(metadata);

            let ipfs_cid = await upload(jsonFile, `Proposal-${title}`, true);
            setIpfsCid(ipfs_cid);

            let proposal_id = await propose([GOV_ADDRESS, GOV_ABI, provider], ipfs_cid);
            setProposalId(proposal_id);
    
            function makeFileObjects (obj) {
                const blob = 
                    new Blob([JSON.stringify(obj)], { type: 'application/json'})
                const files = [
                    new File([blob], 'Proposal.json')
                ]
                return files;
            }
        }
        submit();
    }, [])

    function DisplayLoading() {
        if (!(ipfsCid && proposalId)) {
            return (
            <div className="mb-5 mr-5 p-5 w-full h-full flex flex-col rounded-lg bg-black">
                <p className="text-3xl">Proposal Currently Submitting...</p>
                <Loading />
            </div>
            )
        }
        else {
            dispatch(setRefresh(true));
            return (
                <div className="mb-5 mr-5 p-5 w-full h-full flex flex-col rounded-lg bg-black">
                <p className="text-3xl">
                    Proposal is now on the blockchain. 
                    It may take a minute or two to show up on the app.
                    </p>
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