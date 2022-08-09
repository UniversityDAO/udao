import React, {useEffect} from "react"
import { Link } from "react-router-dom";

function NewProposalLayout(props) {
  useEffect(() => {
    document.title = "UDAO - New " + props.name;
  }, []);

  const hideAmountInput = props.hidden;

  return (
    <> 
      <div className="flex flex-col p-5 mb-5 rounded-lg bg-black">
        <h1 className="text-3xl mb-2.5">Create New {props.name}</h1>
        <h1 className="text-2xl mb-2">Name</h1>
        <input className="text-2xl mb-5 p-1 rounded-lg bg-gray focus:outline-0 focus:shadow-none" maxLength={100} placeholder="Name goes here"></input>
        <h1 className="text-2xl mb-2">Description</h1>
        <textarea className="resize-none flex-grow text-2xl mb-5 p-1 rounded-lg bg-gray focus:outline-0 focus:shadow-none" placeholder="Description goes here"></textarea>
        <div style={{display: (hideAmountInput ? "none" : "block")}}>
          <h1 className="text-2xl mb-2">Amount Requesting</h1>
          <input className="text-2xl mb-5 p-1 rounded-lg bg-gray focus:outline-0 focus:shadow-none" maxLength={100} placeholder="0" type={"number"}></input>
        </div>
        <h1 className="text-2xl mb-2">Submit {props.name}</h1>
        <div className="flex">
          <Link className="mr-5 w-72 h-10 flex justify-center items-center rounded-lg text-2xl bg-purple hover:bg-hover-purple" to={"/" + props.name.toLowerCase() + "s"}>Back</Link>
          <button className="w-72 h-10 flex justify-center items-center rounded-lg text-2xl bg-purple hover:bg-hover-purple">Submit {props.name}</button>
        </div>
      </div>
    </>
  )
}

export default NewProposalLayout
