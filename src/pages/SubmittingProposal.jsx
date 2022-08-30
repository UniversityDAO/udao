import Loading from "../components/LoadingSymbol";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";


import * as web3Storage from '../api/web3StorageAPI'
import { propose } from "../api/EthersApi"
import { GOV_ADDRESS_MUMBAI, GOV_ABI } from "../data/config";

export default async function SubmittingProposal() {

    let jsonFile = useSelector(state => state.currentProposalJSON);
    let slicedString = useSelector(state => state.currentProposalTitle);

    console.log(`jsonFile in SubmittingPage ${JSON.stringify(jsonFile)}`);
    console.log(slicedString);

    const provider = useSelector(state => state.metamaskProvider);
    // TODO: find way to get cid w/o uploading. then wait for blockchain txn to confirm
    // first before then finalling uploading to IPFS (or else we might have files in limbo)
    let ipfs_cid = await web3Storage.upload(jsonFile, `Proposal-${slicedString}`, true);

    // create a proposal on blockchain
    let proposal_id = await propose([GOV_ADDRESS_MUMBAI, GOV_ABI, provider], ipfs_cid);
    // can now do something with proposal_id, like fetch and render or something

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
    return (
      <div>
        Testing testing
      </div>
    )
}