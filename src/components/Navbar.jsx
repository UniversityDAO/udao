import React, { useState } from 'react';
import * as Icons from '@mui/icons-material'
import { Link, NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../css/Navbar.css'
import Logo from '../assets/udao_logo_square.svg'

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className='navbar'>
        <Link to='#' className='menu-icon'>
          <Icons.Menu onClick={showSidebar}/>
        </Link>
        <div className="nav-button-container">
          <button className='nav-button' id='connect-wallet'>Connect Wallet</button>
          <button className='nav-button' id='theme'><Icons.DarkMode/></button>
          <button className='nav-button' id='language'><Icons.Language/></button>
        </div>
      </div>
      <nav className={sidebar ? 'nav-menu-open' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <Link to='#' className='menu-icon'>
              <Icons.Close/>
            </Link>
          </li>
          <div className='nav-logo-container'>
            <img src={Logo} id='nav-logo' alt='logo'/>
          </div>
          <h1 className='nav-logo-text'>UDAO</h1>
          <div className='nav-horizontal' id='top'/>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className='nav-li'>
                <NavLink to={item.path} className='navlink'>
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
          <div className='nav-horizontal'/>
          <div className='nav-social-container'>
            <a href='https://twitter.com/TrumanUDAO' target='_blank'><button className='social-button'><Icons.Twitter/></button></a>
            <a href='https://github.com/UniversityDAO/' target='_blank'><button className='social-button'><Icons.GitHub/></button></a>
          </div>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;