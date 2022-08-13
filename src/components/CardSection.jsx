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
    return (
      data.map(proposal => <Card proposal={proposal}/>)
    )
  }

  return (
    <div className="mb-5 mr-5 p-5 w-full h-full flex flex-col rounded-lg bg-black">
      <p className="text-3xl">{props.header}</p>
        <LoadProposals />
      <a href="#" className="mt-5 text-2xl hover:underline">See more</a>
    </div>
  )
}

export default CardSection
