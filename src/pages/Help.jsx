import React, {useEffect} from 'react'
import Navbar from '../components/Navbar'

function Help() {
  useEffect(() => {
    document.title = "UDAO - Help"
  }, []);
  
  return (
    <>
      <Navbar/>
      <div className='page-content'>
        <div className='row' id='about-us'>
          <h1 className='header-text'>About Us</h1>
          <p className='row-text'>Here is where we can have stuff about our organization. More in depth stuff. Whatever we want can go here.
          <br/>
          <br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget metus pharetra, gravida nunc rutrum, ultrices lacus. Fusce aliquam erat velit, sit amet convallis elit egestas in. Etiam nisi nulla, molestie in metus vestibulum, eleifend fermentum libero. Vestibulum urna risus, maximus vel magna vel, porttitor tristique mauris. Etiam dictum rutrum ante, id aliquam nunc consequat euismod. Donec in odio mi. Fusce vestibulum suscipit mi ut mattis. Morbi euismod, ex ac laoreet dictum, elit sapien ultrices purus, vel pellentesque mauris nunc ut elit. Sed vel tortor fermentum, ultrices odio a, condimentum nisl. Vivamus viverra, metus in tincidunt molestie, erat metus ullamcorper ex, in laoreet sapien odio eget velit. Nulla malesuada nibh massa, eget viverra purus convallis sit amet. Curabitur molestie dolor ante, id ullamcorper mi pharetra at.
          <br/>
          <br/>Nullam gravida neque commodo eros semper tincidunt. Praesent at nulla tempus sapien eleifend pulvinar ut eget odio. Vestibulum ultrices neque vel nunc tempor, a dictum neque semper. Etiam dapibus lectus quis lacus rhoncus sollicitudin. Fusce vel sapien ut purus finibus bibendum. Aliquam iaculis diam et ante vehicula, ac maximus felis tempor. Proin id nibh quis leo aliquet ultrices. Praesent vitae arcu sit amet lacus egestas finibus id et erat. Proin condimentum nulla erat, id eleifend quam eleifend vel. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse eros erat, consequat non nunc at, vehicula finibus augue. Nullam maximus, erat a volutpat consequat, eros quam pellentesque velit, posuere dignissim velit tortor non lectus. Fusce iaculis elementum aliquet.
          <br/></p>
        </div>
        <div className='row' id='faq'>
          <h1 className='header-text'>FAQ</h1>
          <p className='row-text'>FAQ questions can go here.</p>
        </div>
      </div>
    </>
  )
}

export default Help
