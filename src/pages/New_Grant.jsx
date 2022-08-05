import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'

function New_Grant() {
  useEffect(() => {
    document.title = "UDAO - New Grant"
  }, []);
  
  return (
    <> 
      <Navbar/>
      <div className='page-content'>
        <div className='row' id='form'>
          <h1 className='header-text'>Create New Grant</h1>
          <h1 className='body-text'>Name</h1>
          <input id='input-name' maxLength={100} placeholder='Name of your grant'></input>
          <h1 className='body-text'>Description</h1>
          <textarea id='textarea-description' placeholder='Description of your grant'></textarea>
          <h1 className='body-text'>Amount Requesting</h1>
          <input id='input-name' maxLength={100} placeholder='0' type={'number'}></input>
          <h1 className='body-text'>Submit Grant</h1>
          <div className='body-buttons'>
            <Link className='body-button' id='left' to='/grants'>Cancel</Link>
            <button className='body-button'>Submit Grant</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default New_Grant
