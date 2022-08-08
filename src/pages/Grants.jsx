import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Card from '../components/Card'

function Grants() {
  useEffect(() => {
    document.title = "UDAO - Grants"
  }, []);
  
  return (
    <>
      <Navbar/>
      <div className='page-content'>
        <div className='top'>
          <div className='top-data'>
            <div id='data'>
              <h3 id='header'>Current Active Grants</h3>
              <h1 id='info'>6</h1>
            </div>
          </div>
          <div className='top-data'>
            <div id='data'>
              <h3 id='header'>Your Current Votes</h3>
              <h1 id='info'>3</h1>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='row-header'>
            <h1 className='header-text'>Your Voted Grants</h1>
            <Link className='header-button' to='/new_grant'>New Grant</Link>
          </div>
          <Card className='card'/>
          <Card className='card'/>
        </div>
        <div className='row' id='bottom'>
          <h1 className='header-text'>Other Active Grants</h1>
          <Card className='card'/>
          <Card className='card'/>
        </div>
      </div>
    </>
  )
}

export default Grants
