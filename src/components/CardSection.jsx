import React from 'react'
import Card from "../components/Card"

function CardSection(props) {
  return (
    <div className="mb-5 mr-5 p-5 w-full h-full flex flex-col rounded-lg bg-black">
      <p className="text-3xl">{props.header}</p>
      <Card title="lol"/>
      <Card/>
      <Card/>
      <a href="#" className="mt-5 text-2xl hover:underline">See more</a>
    </div>
  )
}

export default CardSection
