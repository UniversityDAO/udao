import React from 'react'

function VoteRatio(props) {
  function YesVotes() {
    if (props.forPercent == 100) {
      return <div style={{width: props.forPercent + "%"}} className="h-2.5 mb-5 rounded-lg bg-green"/>;
    }

    return <div style={{width: props.forPercent + "%"}} className="rounded-r-none h-2.5 mb-5 rounded-lg bg-green"/>;
  }

  function NoVotes() {
    if (props.againstPercent == 100) {
      return <div style={{width: props.forPercent + "%"}} className="h-2.5 mb-5 rounded-lg bg-red"/>;
    }

    return <div style={{width: props.againstPercent + "%"}} className="rounded-l-none h-2.5 mb-5 rounded-lg bg-red"/>;
  }
  
  return (
    <div className="flex justify-between w-full h-2.5 mb-5 rounded-lg bg-purple">
      <YesVotes/>
      <NoVotes/>
    </div>
  );
}

export default VoteRatio
