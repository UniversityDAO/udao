import React from "react"
import { Link } from "react-router-dom";
import ThumbUpOffAltSharp from "@mui/icons-material/ThumbUpOffAltSharp"
import ThumbDownOffAltSharp from "@mui/icons-material/ThumbDownOffAltSharp"
import VoteRatio from "./VoteRatio";

function Card({proposal}) {
  let url = `/view_proposal/${proposal.event.proposalId}`

  const total = proposal.votes.forVotes + proposal.votes.againstVotes
  const forPercent = (proposal.votes.forVotes / total) * 100;
  const againstPercent = (proposal.votes.againstVotes / total) * 100

  return (
    <Link className="transition-all duration-200 w-full h-full p-5 mt-5 border-solid rounded-lg cursor-pointer border-4 border-gray bg-gray hover:bg-hover-gray hover:border-purple" to={url}>
      <h1 className="text-3xl mb-5">{proposal.metadata.title}</h1>
      <VoteRatio forPercent={forPercent} againstPercent={againstPercent}/>
      <div className="flex mb-5">
        <ThumbUpOffAltSharp className="mr-2.5"/>
        <p className="mr-5">{proposal.votes.forVotes}</p>
        <ThumbDownOffAltSharp className="mr-2.5"/>
        <p>{proposal.votes.againstVotes}</p>
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
