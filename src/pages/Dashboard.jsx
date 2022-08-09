import React, {useEffect} from "react"
import TopData from "../components/TopData"
import CardSection from "../components/CardSection"

function Dashboard() {
  useEffect(() => {
    document.title = "UDAO - Dashboard"
  }, []);
  
  return (
    <>
      <div className="mb-5 p-5 flex justify-center items-center rounded-lg bg-black">
        <TopData name="Total Supply" data="69240/69420"/>
        <TopData name="Active Proposals" data="6"/>
        <TopData name="Active Grants" data="2"/>
      </div>
      <div className="flex">
        <CardSection header="Active Proposals"/>
        <CardSection header="Active Grants"/>
      </div>
    </>
  )
}

export default Dashboard
