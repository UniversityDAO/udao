import React from 'react'
import Card from "../components/Card"

import Loading from "./LoadingSymbol"
import { useSelector } from 'react-redux';

function CardSection(props) {
  let loading = useSelector(state => state.isLoading);
  let data = props.data;

  function LoadProposals() {
    if (loading) {
      return <Loading />
    }

    if (props.data.length < 1) {
      return <p className="text-xl mt-5">Nothing here.</p>
    }

    return (
      data.map(proposal => <Card key={proposal.metadata.title} proposal={proposal}/>)
    )
  }

  function SeeMore() {
    const proposalThreshold = 3;
    
    if (data.length > proposalThreshold) {
      return <a href="#" className="mt-5 text-2xl hover:underline">See more</a>;
    }
  }

  return (
    <div className="mb-5 p-5 w-full flex flex-col rounded-lg bg-black">
      <p className="text-3xl">{props.header}</p>
        <LoadProposals/>
        <SeeMore/>
    </div>
  )
}

export default CardSection
