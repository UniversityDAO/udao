import React from "react"
import { Link } from "react-router-dom";
import ThumbUpOffAltSharp from "@mui/icons-material/ThumbUpOffAltSharp"
import ThumbDownOffAltSharp from "@mui/icons-material/ThumbDownOffAltSharp"

function Card(props) {
  return (
    <Link className="w-full h-full p-5 mt-5 border-solid rounded-lg cursor-pointer border-4 border-gray bg-gray hover:bg-hover-gray hover:border-purple" to="/view_proposal">
      <h1 className="text-3xl mb-5">{props.title}</h1>
      <div className="w-full h-2.5 mb-5 rounded-lg bg-red">
        <div className="w-10/12 rounded-r-none h-2.5 mb-5 rounded-lg bg-green"/>
      </div>
      <div className="flex mb-5">
        <ThumbUpOffAltSharp className="mr-2.5"/>
        <p className="mr-5">{props.yesvotes}</p>
        <ThumbDownOffAltSharp className="mr-2.5"/>
        <p>{props.novotes}</p>
      </div>
      <div className="flex">
        <div className="mr-2.5 p-2.5 pt-1 pb-1 rounded-lg flex justify-center items-center bg-purple hover:bg-hover-purple">
          Active
        </div>
        <div className="p-2.5 pt-1 pb-1 rounded-lg flex justify-center items-center bg-purple hover:bg-hover-purple">
          God
        </div>
      </div>
    </Link>
  )
}

export default Card
