import React from 'react'

function Tag({proposal}) {
  const statuses = ["Pending", "Active", "Canceled", "Failed",
                    "Passed", "Queued", "Expired", "Executed"]
  let name = "Undefined";

  for (let i = 0; i < statuses.length; i++) {
    if (proposal.state == i) {
      name = statuses[i];
      break;
    }
  }

  return (
    <div className={"transition-all duration-200 mr-2.5 p-2.5 pt-1 pb-1 rounded-lg flex justify-center items-center " +
      (proposal.state == 4 || proposal.state == 7
        ? "bg-green" : (proposal.state == 2 || proposal.state == 3 || proposal.state == 6
          ? "bg-red" : "bg-purple"))
    }>
        {name}
    </div>
  )
}

export default Tag