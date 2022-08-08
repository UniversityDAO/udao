import React from 'react'

function TopData(props) {
  return (
    <div className="ml-14 mr-14 flex justify-center items-center">
      <div className="text-center">
        <p className="text-3xl">{props.name}</p>
        <p className="text-5xl">{props.data}</p>
      </div>
    </div>
  )
}

export default TopData
