import Loading from "../components/LoadingSymbol";
import { Link } from "react-router-dom";

export default function SubmittingProposal(props) {
    let loading = props.loading;

    if (loading) {
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