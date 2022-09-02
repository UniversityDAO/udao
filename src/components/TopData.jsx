import React from 'react'

function TopData(props) {
  return (
    <div className="flex md:ml-10 md:mr-10 justify-center items-center">
      <div className="text-center">
        <p className="text-3xl mb-2">{props.name}</p>
        <p className="text-5xl">{props.data}</p>
      </div>
    </div>
  )
}

export default TopData
