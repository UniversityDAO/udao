import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'

function New_Proposal() {
  useEffect(() => {
    document.title = "UDAO - New Proposal"
  }, []);
  
  return (
    <> 
      <Navbar/>
      <div className='page-content'>
        <div className='row' id='form'>
          <h1 className='header-text'>Create New Proposal</h1>
          <h1 className='body-text'>Name</h1>
          <input id='input-name' maxLength={100} placeholder='Name of your proposal'></input>
          <h1 className='body-text'>Description</h1>
          <textarea id='textarea-description' placeholder='Description of your proposal'></textarea>
          <h1 className='body-text'>Submit Proposal</h1>
          <div className='body-buttons'>
            <Link className='body-button' id='left' to='/proposals'>Cancel</Link>
            <button className='body-button'>Submit Proposal</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default New_Proposal
