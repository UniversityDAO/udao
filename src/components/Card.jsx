import React from 'react'
import { Link } from 'react-router-dom';
import * as Icons from '@mui/icons-material'
import '../css/Card.css'

function Card() {
  return (
    <Link className='card' to='/view_proposal'>
      <h1 className='title'>Name of a very long proposal here</h1>
      <div className='vote-bar' id='no-votes'>
        <div className='vote-bar' id='yes-votes'/>
      </div>
      <div className='vote-container'>
        <Icons.ThumbUpOffAltSharp className='vote-icon'/>
        <p className='vote-number'>43</p>
        <Icons.ThumbDownOffAltSharp className='vote-icon'/>
        <p className='vote-number'>7</p>
      </div>
      <div className='type-container'>
        <div className='active'>
          Active
        </div>
        <div className='active'>
          God
        </div>
      </div>
    </Link>
  )
}

export default Card
