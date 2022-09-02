import React from "react"
import { Link } from "react-router-dom";
import ThumbUpOffAltSharp from "@mui/icons-material/ThumbUpOffAltSharp"
import ThumbDownOffAltSharp from "@mui/icons-material/ThumbDownOffAltSharp"
import VoteRatio from "./VoteRatio";

import { setSelectedProposal } from "../../reduxActions";
import { useDispatch } from 'react-redux/es/exports';

function Card(props) {

  const dispatch = useDispatch();

  const total = props.proposal.votes.forVotes + props.proposal.votes.againstVotes
  const forPercent = (props.proposal.votes.forVotes / total) * 100;
  const againstPercent = (props.proposal.votes.againstVotes / total) * 100

  function handleClick() {
    dispatch(setSelectedProposal(props.proposal))
  }

  return (
    <Link className="transition-all duration-200 w-full h-full p-5 mt-5 border-solid rounded-lg cursor-pointer border-4 border-gray bg-gray hover:bg-hover-gray hover:border-purple" onClick={() => handleClick()} to="/view_proposal">
      <h1 className="text-3xl mb-5">{props.proposal.metadata.title}</h1>
      <VoteRatio forPercent={forPercent} againstPercent={againstPercent}/>
      <div className="flex mb-5">
        <ThumbUpOffAltSharp className="mr-2.5"/>
        <p className="mr-5">{props.proposal.votes.forVotes}</p>
        <ThumbDownOffAltSharp className="mr-2.5"/>
        <p>{props.proposal.votes.againstVotes}</p>
      </div>
      <div className="flex">
        <div className="transition-all duration-200 mr-2.5 p-2.5 pt-1 pb-1 rounded-lg flex justify-center items-center bg-purple hover:bg-hover-purple">
          Active
        </div>
        <div className="transition-all duration-200 p-2.5 pt-1 pb-1 rounded-lg flex justify-center items-center bg-purple hover:bg-hover-purple">
          Another Status
        </div>
      </div>
    </Link>
  )
}

export default Card
