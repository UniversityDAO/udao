import React from "react"
import { Link } from "react-router-dom";
import ThumbUpOffAltSharp from "@mui/icons-material/ThumbUpOffAltSharp"
import ThumbDownOffAltSharp from "@mui/icons-material/ThumbDownOffAltSharp"

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

  function YesVotes() {
    if (forPercent == 100) {
      return <div style={{width: forPercent + "%"}} className="h-2.5 mb-5 rounded-lg bg-green"/>;
    }

    return <div style={{width: forPercent + "%"}} className="rounded-r-none h-2.5 mb-5 rounded-lg bg-green"/>;
  }

  function NoVotes() {
    if (againstPercent == 100) {
      return <div style={{width: forPercent + "%"}} className="h-2.5 mb-5 rounded-lg bg-red"/>;
    }

    return <div style={{width: againstPercent + "%"}} className="rounded-l-none h-2.5 mb-5 rounded-lg bg-red"/>;
  }
  
  function VoteRatio() {
    return (<div className="flex justify-between w-full h-2.5 mb-5 rounded-lg bg-purple">
      <YesVotes/>
      <NoVotes/>
    </div>);
  }

  return (
    <Link className="w-full h-full p-5 mt-5 border-solid rounded-lg cursor-pointer border-4 border-gray bg-gray hover:bg-hover-gray hover:border-purple" onClick={() => handleClick()} to="/view_proposal">
      <h1 className="text-3xl mb-5">{props.proposal.metadata.title}</h1>
      <VoteRatio/>
      <div className="flex mb-5">
        <ThumbUpOffAltSharp className="mr-2.5"/>
        <p className="mr-5">{props.proposal.votes.forVotes}</p>
        <ThumbDownOffAltSharp className="mr-2.5"/>
        <p>{props.proposal.votes.againstVotes}</p>
      </div>
      <div className="flex">
        <div className="mr-2.5 p-2.5 pt-1 pb-1 rounded-lg flex justify-center items-center bg-purple hover:bg-hover-purple">
          Active
        </div>
        <div className="p-2.5 pt-1 pb-1 rounded-lg flex justify-center items-center bg-purple hover:bg-hover-purple">
          Big Dog Status
        </div>
      </div>
    </Link>
  )
}

export default Card
