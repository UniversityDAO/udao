import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import TopData from "../components/TopData"
import CardSection from "../components/CardSection"

import { useSelector } from 'react-redux';

function ProposalsLayout(props) {
  useEffect(() => {
    document.title = "UDAO - " + props.name;
  }, []);

  const name = props.name.slice(0, -1);
  const link = "/new_" + name.toLowerCase();

  let activeProposals = useSelector(state => state.activeProposals);
  let inactiveProposals = useSelector(state => state.inactiveProposals);

  let activeProposalsLength = activeProposals.length;
  let inactiveProposalsLength = inactiveProposals.length;

  return (
    <>
      <Link className="transition-all duration-200 w-48 h-12 mb-5 mr-2.5 p-5 flex justify-center items-center rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white" to={link}>New {name}</Link>
      <div className="mb-5 p-5 flex flex-col md:flex-row justify-center items-center rounded-lg bg-black">
        <TopData name={"Active " + props.name} data={activeProposalsLength}/>
        <TopData name={"Inactive " + props.name} data={inactiveProposalsLength}/>
      </div>
      <CardSection header={"Active " + props.name} data={activeProposals}/>
      <CardSection header={"Inactive " + props.name} data={inactiveProposals}/>
    </>
  )
}

export default ProposalsLayout
