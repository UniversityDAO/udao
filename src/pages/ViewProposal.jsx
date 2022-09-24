import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThumbUpOffAltSharp from "@mui/icons-material/ThumbUpOffAltSharp"
import ThumbDownOffAltSharp from "@mui/icons-material/ThumbDownOffAltSharp"
import VoteRatio from "../components/VoteRatio";
import Tag from "../components/Tag";
import Popup from "../components/Popup";

import { useSelector } from 'react-redux';
import { vote } from "../api/EthersApi";
import { GOV_ABI, GOV_ADDRESS } from "../data/config";

function ViewProposalLayout(props) {
  const [isShown, setIsShown] = useState(false);
  const togglePopup = () => setIsShown(!isShown);
  
  let data = useSelector(state => state.selectedProposal);
  let metamaskProvider = useSelector(state => state.metamaskProvider);

  const total = data.votes.forVotes + data.votes.againstVotes;
  const forPercent = (data.votes.forVotes / total) * 100;
  const againstPercent = (data.votes.againstVotes / total) * 100;

  useEffect(() => {
    document.title = "UDAO - View " + props.name;
  }, []);
  
  let voteAndCheck = async (voteType) => {
    try {
      let event = await vote([GOV_ADDRESS, GOV_ABI, metamaskProvider], data.event.proposalId, voteType, "");
    } catch(e) {
      togglePopup();
    }
  }

  function VoteButtons() {
    if (data.state == 1) {
      return (
        <div className="flex flex-col lg:flex-row">
          <button className="transition-all duration-200 mb-5 lg:mr-5 lg:mb-0 w-72 h-10 flex justify-center items-center rounded-lg text-2xl bg-green hover:bg-hover-green" onClick={() => voteAndCheck(1) }>Yea</button>
          <button className="transition-all duration-200 mb-10 lg:mr-5 lg:mb-0 w-72 h-10 flex justify-center items-center rounded-lg text-2xl bg-red hover:bg-hover-red" onClick={() => voteAndCheck(0) }>Nay</button>
        </div>
      )
    }
  }

  return (
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
        <div className="flex mb-5">
          <Tag proposal={data}/>
        </div>
        <div className="flex flex-col justify-between items-center lg:flex-row">
          <VoteButtons/>
          <button className="transition-all duration-200 w-72 h-10 flex justify-center items-center rounded-lg text-2xl bg-purple hover:bg-hover-purple" onClick={() => history.back()}>Back</button>
        </div>
      </div>
      <div className="flex flex-col p-5 mb-5 rounded-lg bg-black">
        <p className="text-3xl mb-2">Description</p>
          <p>
            {data.metadata.description}
          </p>
      </div>
      <Popup isShown={isShown} onCloseClick={togglePopup} message="Please connect wallet." button={<button onClick={() => togglePopup()} className="transition-all duration-200 w-48 h-10 m-5 ml-2.5 mr-2.5 rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white">Okay</button>}/>
    </>
  )
}

export default ViewProposalLayout
