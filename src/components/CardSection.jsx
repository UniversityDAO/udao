import React, { useState } from 'react'
import Card from "../components/Card"

import Loading from "./LoadingSymbol"
import { useSelector } from 'react-redux';

function CardSection(props) {
  const proposalThreshold = 3;
  const [count, setCount] = useState(proposalThreshold);

  let loading = useSelector(state => state.isLoading);
  let data = props.data;

  function addCount() {
    if (count >= data.length) {
      return data.length;
    }

    return count + proposalThreshold;
  }

  function LoadProposals() {
    let proposals = []
    
    if (loading) {
      return <Loading/>
    }

    if (props.data.length < 1) {
      return <p className="text-xl mt-5">Nothing here.</p>
    }

    for (let i = 0; i < count; i++) {
      if (data[i]) {
        proposals.push(data[i]);
        console.log(i);
      }
    }

    return (
      proposals.map(proposal => <Card key={proposal.metadata.title} proposal={proposal}/>)
    )
  }

  function SeeMore() {
    if (data.length > proposalThreshold && count < data.length) {
      return <button onClick={() => setCount(addCount())} className="mt-5 text-2xl hover:underline">See more</button>;
    }
  }

  return (
    <div className="mb-5 p-5 w-full flex flex-col rounded-lg bg-black">
      <p className="text-3xl">{props.header}</p>
        <LoadProposals/>
        <div>
          <SeeMore/>
        </div>
    </div>
  )
}

export default CardSection
