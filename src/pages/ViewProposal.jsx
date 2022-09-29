import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import ThumbUpOffAltSharp from "@mui/icons-material/ThumbUpOffAltSharp"
import ThumbDownOffAltSharp from "@mui/icons-material/ThumbDownOffAltSharp"
import VoteRatio from "../components/VoteRatio";

import Loading from "../components/LoadingSymbol"

import { useSelector } from 'react-redux';
import { vote } from "../api/EthersApi";
import { GOV_ABI, GOV_ADDRESS } from "../data/config";

function ViewProposalLayout(props) {
  let metamaskProvider = useSelector(state => state.metamaskProvider);
  let loading = useSelector(state => state.isLoading);
  let proposals = useSelector(state => state.allProposals);

  let data = undefined;

  let total = 0;
  let forPercent = 0;
  let againstPercent = 0;

  let { proposalId } = useParams();
  console.log(`Proposal ID is: ${proposalId}`);
  
  if (!loading) {
    for ( const proposal of proposals) {
      if (proposalId === proposal.event.proposalId){
        data = proposal
        break
      }
    }
    total = data.votes.forVotes + data.votes.againstVotes;
    forPercent = (data.votes.forVotes / total) * 100;
    againstPercent = (data.votes.againstVotes / total) * 100;
  }

  useEffect(() => {
    document.title = "UDAO - View " + props.name;
  }, []);
  
  let voteAndCheck = async (voteType) => {
    let event = await vote([GOV_ADDRESS, GOV_ABI, metamaskProvider], data.event.proposalId, voteType, "");
  }

  return (
    <>
      {loading 
      ?
      <>
        <div className="flex flex-col p-5 mb-5 rounded-lg bg-black">
        <p className="text-3xl">Loading Proposal...</p>
        </div>
        <Loading/> 
      </>
      :
      <>
      <div className="flex flex-col p-5 mb-5 rounded-lg bg-black">
        <p className="text-3xl">{data.metadata.title}</p>
      </div>
      <div className="flex flex-col p-5 mb-5 rounded-lg bg-black">
        <p className="text-3xl mb-2">Votes</p>
        <div className="flex mb-2">
          <ThumbUpOffAltSharp className="mr-2.5"/>
          <p className="mr-2.5">{data.votes.forVotes}</p>
          <ThumbDownOffAltSharp className="mr-2.5"/>
          <p>{data.votes.againstVotes}</p>
        </div>
        <VoteRatio forPercent={forPercent} againstPercent={againstPercent}/>
        <div className="flex flex-col justify-between items-center lg:flex-row">
          <div className="flex flex-col lg:flex-row">
            <button className="transition-all duration-200 mb-5 lg:mr-5 lg:mb-0 w-72 h-10 flex justify-center items-center rounded-lg text-2xl bg-green hover:bg-hover-green" onClick={() => voteAndCheck(1) }>Yea</button>
            <button className="transition-all duration-200 mb-10 lg:mr-5 lg:mb-0 w-72 h-10 flex justify-center items-center rounded-lg text-2xl bg-red hover:bg-hover-red" onClick={() => voteAndCheck(0) }>Nay</button>
          </div>
          <button className="transition-all duration-200 w-72 h-10 flex justify-center items-center rounded-lg text-2xl bg-purple hover:bg-hover-purple" onClick={() => history.back()}>Back</button>
        </div>
      </div>
      <div className="flex flex-col p-5 mb-5 rounded-lg bg-black">
        <p className="text-3xl mb-2">Description</p>
          <p>
            {data.metadata.description}
          </p>
      </div> 
      </>}
  </>)
}

export default ViewProposalLayout
