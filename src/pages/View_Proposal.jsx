import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import * as Icons from '@mui/icons-material'
import Navbar from '../components/Navbar'

function View_Proposal() {
  useEffect(() => {
    document.title = "UDAO - View Proposal"
  }, []);
  
  return (
    <>
      <Navbar/>
      <div className='page-content'>
        <div className='top' id='view-proposal'>
          <h1>Name of very long proposal here</h1>
        </div>
        <div className='row' id='vote-area'>
          <div className='vote-container'>
            <Icons.ThumbUpOffAltSharp className='vote-icon'/>
            <p className='vote-number'>43</p>
            <Icons.ThumbDownOffAltSharp className='vote-icon'/>
            <p className='vote-number'>7</p>
          </div>
          <div className='vote-bar' id='no-votes'>
            <div className='vote-bar' id='yes-votes'/>
          </div>
          <div className='body-buttons'>
            <button className='body-button' id='yea'>Yea</button>
            <button className='body-button' id='nay'>Nay</button>
            <Link className='body-button' id='yes' to='/proposals'>Cancel</Link>
          </div>
        </div>
        <div className='row' id='bottom'>
          <h1 className='header-text'>Description</h1>
          <p>
            This is an example of a very long proposal description.
            <br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed ex sem. In semper magna auctor nibh auctor, vitae viverra velit finibus. Curabitur condimentum mollis arcu sed viverra. Aliquam finibus velit risus, ac hendrerit odio vestibulum id. Morbi ullamcorper enim vel ipsum eleifend maximus. Cras nec erat vulputate tellus tempor mattis a sit amet metus. Integer eu maximus quam. Fusce aliquet non lorem eget accumsan. Duis gravida vehicula tortor, eget malesuada mauris. Proin tristique lorem ipsum, semper lacinia odio interdum tempor. Etiam vel sem velit. Nunc varius lorem sed turpis semper blandit. Nunc malesuada rutrum eleifend. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean semper consequat mollis.
            <br/><br/>Morbi massa elit, congue id aliquam quis, rutrum vel sapien. Aenean vel finibus nisi, vel sagittis lorem. Donec id aliquam risus, at tempor dolor. Morbi condimentum a mauris ultrices porttitor. Nullam rutrum magna mattis fermentum vestibulum. Sed eu lorem sapien. Quisque rhoncus maximus lacus. Suspendisse libero metus, accumsan eget diam a, fermentum gravida dui. Suspendisse euismod nisi eget justo placerat, at euismod nulla interdum. Morbi quis ex sed nisl luctus dictum. Suspendisse potenti. Nunc quis dapibus purus, et gravida magna. Mauris malesuada tempor velit ac consectetur.
            <br/><br/>Fusce ut dolor non eros mollis fringilla sodales at magna. Nulla luctus, lacus quis varius rutrum, quam justo hendrerit justo, a facilisis arcu nibh eget nisl. Pellentesque eleifend odio vel diam elementum, a iaculis erat accumsan. Proin semper nisi mauris, id rutrum ligula laoreet vitae. Nullam malesuada libero vel justo faucibus, in bibendum felis tempus. Aenean ac massa at tortor vulputate auctor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam aliquet elit odio, et molestie quam consectetur vitae. Proin condimentum sed erat eget rutrum. Cras ullamcorper semper egestas. Vestibulum erat nisl, euismod id ex eu, porta vulputate ex. In vitae gravida dui. Suspendisse consequat tempus augue tempus sollicitudin. Fusce diam quam, sodales eget lacus id, rutrum commodo dui. In hac habitasse platea dictumst. Suspendisse facilisis tellus turpis, et dictum ex semper ut.
            <br/><br/>Nunc ut augue vel nulla cursus porta. Donec nec nibh mollis, finibus odio vel, sodales felis. Vestibulum lacinia sagittis dui, sed ornare ligula luctus vitae. Curabitur rutrum sem urna, a viverra eros porta a. Donec faucibus purus vel enim mollis, sed cursus nisi tincidunt. Maecenas tempus vestibulum tincidunt. Suspendisse potenti. Phasellus non nunc maximus, interdum tortor sit amet, maximus elit.
            <br/><br/>Vestibulum nec risus a ligula aliquet ullamcorper. Morbi feugiat lectus velit, id pulvinar odio porttitor quis. Sed sem neque, vulputate finibus tempor non, eleifend nec augue. Mauris luctus malesuada dignissim. Fusce pulvinar urna ultricies lectus blandit, ac accumsan ipsum bibendum. Cras non tortor dignissim lacus vulputate elementum. Nunc vitae purus ut dui auctor commodo eget pretium velit. Fusce consequat euismod ligula, at scelerisque dolor molestie id. Suspendisse mattis diam nunc, nec tincidunt nulla lobortis nec. Vivamus ultrices odio vel elit rhoncus, eget porta leo laoreet.
          </p>
        </div>
      </div>
    </>
  )
}

export default View_Proposal
