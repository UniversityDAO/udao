import React, {useEffect} from "react"
import TopData from "../components/TopData"
import CardSection from "../components/CardSection"
import ConnectWallet from "../components/ConnectWallet"

import { useSelector } from 'react-redux';

function Dashboard() {
  useEffect(() => {
    document.title = "UDAO - Dashboard"
  }, []);
  
  let activeProposals = useSelector(state => state.activeProposals);
  let activeGrants = useSelector(state => state.activeGrants);
  let totalNfts = useSelector(state => state.totalNfts);

  let activeProposalCount = activeProposals.length;
  let activeGrantCount = activeGrants.length;

  return (
    <>
      <div className="mb-5 p-5 flex justify-center items-center rounded-lg bg-black">
        <TopData name="Total Members" data={totalNfts}/>
        <TopData name="Active Proposals" data={activeProposalCount}/>
        <TopData name="Active Grants" data={activeGrantCount}/>
      </div>
      <div className="flex">
        <CardSection header="Active Proposals" data={activeProposals}/>
        <CardSection header="Active Grants" data={activeGrants}/>
      </div>
      
      {/*For testing, will be removed*/}
      <ConnectWallet/>
    </>
  )
}

export default Dashboard
