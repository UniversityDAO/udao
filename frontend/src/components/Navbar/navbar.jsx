import { Link } from "react-router-dom";
import { useState } from 'react';
import logo from "../../DaoLogo.svg"
import "./navbar.css";

import MetamaskConnect from "../Buttons/MetamaskConnect";

import { delegate } from '../../data/EthersApi';
import { NFT_ADDRESS, NFT_ABI } from '../../data/config';
import { useEffect } from "react";
import { ethers } from "ethers";

function Navbar() {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);

    useEffect(() => {
        async function setUp() {
            let accounts = await window.ethereum.request({ method: 'eth_accounts' });
            setAccount(accounts[0]);
            setProvider(new ethers.providers.Web3Provider(window.ethereum));
        }
        setUp();
    }, []);


    const checkAndDelegate = () => {
        if (account && provider) {
            delegate([NFT_ADDRESS, NFT_ABI, provider], account);
        } else {
            console.log("Account is null. Must connect metamask first before delegating");
        }
    }

    return (
    <div className="vertical-nav" id="sidebar">
        <div className="py-4 px-3 mb-4">
          <div className="media d-flex align-items-center">
            <div className="media-body">
              <Link to="/Dashboard">
                <img src={logo} className = "daoLogo" to="./Dashboard"/>
              </Link>
            </div>
          </div>
        </div>

      <ul className="nav flex-column bg-white mb-0">
        <li className="nav-item">
          <Link to="/Dashboard" className="nav-link text-dark font-italic bg-light"><i className="fa fa-home mr-3 text-primary fa-fw"></i>Dashboard</Link>  
        </li>
        <li className="nav-item">
          <Link to="/Grants" className="nav-link text-dark font-italic"><i className="fa-solid fa-dollar-sign mr-3 text-primary fa-fw"/>Grants</Link>
        </li>
        <li className="nav-item">
          <Link to="/Proposals" className="nav-link text-dark font-italic"><i className="fa fa-picture-o mr-3 text-primary fa-fw"></i>Proposals</Link>
        </li>
        <li className="nav-item">
          <Link to="/Help" className="nav-link text-dark font-italic"><i className="fa fa-picture-o mr-3 text-primary fa-fw"></i>Help</Link>
        </li>
      </ul>

      <div className="connect-wallet">
        <MetamaskConnect />
      </div>
      <button className='btn btn-primary' onClick={() => checkAndDelegate()}>Delegate (to self)</button>
    </div>
  )
}

export default Navbar;