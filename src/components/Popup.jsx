import React, {useCallback} from 'react'

import Close from "@mui/icons-material/Close"

function Popup({isShown, onCloseClick, message, button}) {
  const handleCloseClick = useCallback(event => {
    onCloseClick(event.target.value)
  }, [onCloseClick])
  
  return (
    !isShown ? null :
      <div className="z-50 p-5 flex flex-col justify-center items-center fixed top-0 left-0 w-screen h-screen bg-black/80">
        <div className="p-5 flex flex-col justify-center rounded-lg bg-gray">
        <button onClick={handleCloseClick} className="pt-3 pb-6 flex justify-center items-center w-6 h-6 rounded-lg text-lg cursor-pointer hover:text-white"><Close/></button>
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl">{message}</p>
          {button}
        </div>
        </div>
      </div>
  )
}

export default Popup