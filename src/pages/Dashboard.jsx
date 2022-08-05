import React, {useEffect} from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'

function Dashboard() {
  useEffect(() => {
    document.title = "UDAO - Dashboard"
  }, []);
  
  return (
    <>
      <Navbar className='active-page'/>
      <div className='page-content'>
        <div className='top'>
          <div className='top-data'>
            <div id='data'>
              <h3 id='header'>Total Supply</h3>
              <h1 id='info'>69420/69420</h1>
            </div>
          </div>
          <div className='top-data'>
            <div id='data'>
              <h3 id='header'>Active Proposals</h3>
              <h1 id='info'>8</h1>
            </div>
          </div>
          <div className='top-data'>
            <div id='data'>
              <h3 id='header'>Active Grants</h3>
              <h1 id='info'>2</h1>
            </div>
          </div>
        </div>
        <div className='table-row'>
          <div className='column' id='proposals'>
            <h1 className='header'>Active Proposals</h1>
            <Card className='card'/>
            <Card className='card'/>
            <Card className='card'/>
            <a href='#' className='see-more'>See more</a>
          </div>
          <div className='column' id='grants'>
          <h1 className='header'>Active Grants</h1>
            <Card className='card'/>
            <Card className='card'/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
