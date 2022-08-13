import React, { useState, useEffect } from "react";
import DarkMode from "@mui/icons-material/DarkMode"
import Language from "@mui/icons-material/Language"
import Twitter from "@mui/icons-material/Twitter"
import GitHub from "@mui/icons-material/GitHub"
import { NavLink } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import Logo from "../assets/udao_logo_square.svg"
import { delegate } from "../api/EthersApi";
import { NFT_ADDRESS, NFT_ABI } from "../data/config"
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';

import MetamaskConnect from "./metamaskConnect";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  let provider = useSelector(state => state.metamaskProvider);
  let account;

  useEffect(() => {
    async function setUp() {
        let accounts = await window.ethereum.request({ method: 'eth_accounts' });
        account = accounts[0];
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
    <>
      <div className="w-full h-20 flex justify-end">
        <button className="w-48 m-5 ml-2.5 mr-2.5 rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white" onClick={() => checkAndDelegate()}>Delegate (To Self)</button>
        <button className="w-48 m-5 ml-2.5 mr-2.5 rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white">
          Connect Wallet
          <MetamaskConnect />
        </button>
        <button className="w-10 m-5 ml-2.5 mr-2.5 rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white"><DarkMode/></button>
        <button className="w-10 m-5 ml-2.5 rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white"><Language/></button>
      </div>
      <nav className="bg-black w-72 h-screen flex justify-center fixed top-0 flex-1">
        <ul className="w-full">
          <div className="h-28 m-5 flex justify-center align-center">
            <img src={Logo} alt="logo"/>
          </div>
          <p className="flex justify-center align-center font text-7xl">UDAO</p>
          <div className="h-0.5 m-5 flex justify-center align-center bg-purple"/>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className="flex justify-center">
                <NavLink to={item.path} className="w-10/12 mb-2.5 p-3 flex justify-start align-center rounded-lg hover:bg-purple hover:text-white">
                  {item.icon}
                  <span className="ml-4">{item.title}</span>
                </NavLink>
              </li>
            );
          })}
          <div className="h-0.5 m-5 mt-2.5 flex justify-center align-center bg-purple"/>
          <div className="flex justify-center align-center">
            <a href="https://twitter.com/TrumanUDAO" target="_blank" className="w-10 h-10 m-5 mt-0 mr-2.5 text-lg rounded-lg bg-purple hover:bg-hover-purple hover:text-white"><div className="w-full h-full flex justify-center items-center"><Twitter/></div></a>
            <a href="https://github.com/UniversityDAO/" target="_blank" className="w-10 h-10 mt-0 m-5 ml-2.5 text-lg rounded-lg bg-purple hover:bg-hover-purple hover:text-white"><div className="w-full h-full flex justify-center items-center"><GitHub/></div></a>
          </div>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;