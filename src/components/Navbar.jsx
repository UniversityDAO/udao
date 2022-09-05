import React, { useState, useEffect } from "react";
import DarkMode from "@mui/icons-material/DarkMode"
import Close from "@mui/icons-material/Close"
import Menu from "@mui/icons-material/Menu"
import Language from "@mui/icons-material/Language"
import Twitter from "@mui/icons-material/Twitter"
import GitHub from "@mui/icons-material/GitHub"
import { NavLink } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import Logo from "../assets/udao_logo_square.svg"
import { delegate } from "../api/EthersApi";
import { NFT_ADDRESS, NFT_ABI } from "../data/config"
import { useDispatch, useSelector } from 'react-redux';
import { setAccount, setMetamaskProvider } from '../../reduxActions';

import { POLYGON_CHAIN_ID } from "../data/config";

function Navbar() {
  const [isShown, setIsShown] = useState(false);
  const toggleSidebar = () => setIsShown(!isShown);

  const currentAccount = useSelector(state => state.account);

  let metamaskProvider = useSelector(state => state.metamaskProvider);
  let network = useSelector(state => state.network);
  let accounts = useSelector(state => state.account);

//   useEffect(() => {
//     async function setUp() {
//         let accounts = await window.ethereum.request({ method: 'eth_accounts' });
//         account = accounts[0];
//     }
//     setUp();
//   }, []);

  const checkAndDelegate = () => {
    if (accounts !== 0 && metamaskProvider) {
        delegate([NFT_ADDRESS, NFT_ABI, metamaskProvider], accounts[0]);
    } else {
        alert("Account is null. Must connect metamask first before delegating");
    }
  }

  return (
    <>
      <div className="flex justify-between p-5">
        <button onClick={toggleSidebar} className="transition-all duration-200 flex justify-center items-center w-12 h-12 rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white"><Menu/></button>
        <div className="flex">
          <button className="transition-all duration-200 hidden md:flex justify-center items-center w-12 h-12 mr-5 rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white"><DarkMode/></button>
          <button className="transition-all duration-200 hidden md:flex justify-center items-center w-12 h-12 mr-5 rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white"><Language/></button>
          {currentAccount.length == 0 ? <div/> : <button className="transition-all duration-200 flex justify-center items-center mr-5 w-28 h-12 rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white" onClick={() => checkAndDelegate()}>Delegate</button>}
          <ConnectButton metamaskProvider={metamaskProvider} network={network}/>
        </div>
      </div>
      <div onClick={toggleSidebar} className={"overflow-y-auto bg-black/50 w-screen h-screen fixed top-0 "  + (isShown ? "block" : "hidden") + " lg:hidden"}/>
      <nav className={"overflow-y-auto bg-black w-72 h-screen flex justify-center fixed top-0 " + (isShown ? "left-0" : "-left-full") + " lg:left-0"}>
        <ul className="w-full">
          <div className="h-24 m-3 flex justify-center align-center">
            <img src={Logo} alt="logo"/>
          </div>
          <p className="flex justify-center align-center text-6xl">UDAO</p>
          <div className="h-0.5 m-5 flex justify-center align-center bg-purple"/>
          <p className="m-5 mb-0 text-xl text-white">Your Wallet Address:</p>
          
          {currentAccount.length !== 0 ? <p className="m-5 mt-0">{currentAccount[0].slice(0,5) + '...' + currentAccount[0].slice(-3)}</p> : <p className="m-5 mt-0">Not Connected</p>}
          <div className="h-0.5 m-5 flex justify-center align-center bg-purple"/>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className="flex justify-center">
                <NavLink to={item.path} className="transition-all duration-200 w-72 m-4 mt-2 mb-2 p-3 flex justify-start align-center rounded-lg hover:bg-purple hover:text-white">
                  {item.icon}
                  <span className="ml-4">{item.title}</span>
                </NavLink>
              </li>
            );
          })}
          <div className="h-0.5 m-5 flex justify-center align-center bg-purple"/>
          <div className="flex justify-center align-center">
            <a href="https://twitter.com/TrumanUDAO" target="_blank" className="transition-all duration-200 w-10 h-10 m-5 mt-0 mr-2.5 text-lg rounded-lg bg-purple hover:bg-hover-purple hover:text-white"><div className="w-full h-full flex justify-center items-center"><Twitter/></div></a>
            <a href="https://github.com/UniversityDAO/" target="_blank" className="transition-all duration-200 w-10 h-10 mt-0 m-5 ml-2.5 text-lg rounded-lg bg-purple hover:bg-hover-purple hover:text-white"><div className="w-full h-full flex justify-center items-center"><GitHub/></div></a>
          </div>
        </ul>
      </nav>
    </>
  );
}

function ConnectButton(props) {
  const [isShown, setIsShown] = useState(false);
  const togglePopup = () => setIsShown(!isShown);
  
  const metamaskProvider = props.metamaskProvider;

  const dispatch = useDispatch();
  const currentAccount = useSelector(state => state.account);

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
      dispatch(setAccount(accounts));
    }
  }   

  const connectAccount = async () => {
    try {
      const accounts = await metamaskProvider.provider.request({ method: 'eth_requestAccounts' });
      await handleAccountsChanged(accounts);
    } catch (err) {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert('User denied connection. Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    }

    {window.location.reload()}
  }

  const disconnectAccount = async () => {
    // TODO: Add disconnect account

    {window.location.reload()}
  }

  function SwitchMessagePopup() {
    const metamaskProvider = useSelector(state => state.metamaskProvider);

    const switchNetwork = async () => {
      try {
        await metamaskProvider.provider.request({ 
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: POLYGON_CHAIN_ID}],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: POLYGON_CHAIN_ID,
                  chainName: 'Polygon Mainnet',
                  rpcUrls: ['https://polygon-rpc.com'],
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
        console.error(switchError);    
      }
    }

    return (
      <Popup message="This app only works on Polygon mainnet." button={<button onClick={() => switchNetwork()} className="w-48 h-10 m-5 ml-2.5 mr-2.5 rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white">Switch Network</button>}/>
    )
  }

  function Popup(props) {
    return (
      <div className={"transition-all duration-200 p-5 flex flex-col justify-center items-center fixed top-0 w-screen h-screen bg-black/80 " + (isShown ? "left-0" : "-left-full")}>
        <div className="p-5 flex flex-col justify-center rounded-lg bg-gray">
          <button onClick={togglePopup} className="transition-all duration-200 pt-3 pb-6 flex justify-center items-center w-6 h-6 rounded-lg text-lg cursor-pointer hover:text-white"><Close/></button>
          <div className="flex flex-col justify-center items-center">
            <p className="text-2xl">{props.message}</p>
            {props.button}
          </div>
        </div>
      </div>
    )
  }

  const RenderPopup = () => {
    // Install metamask popup  
    if (metamaskProvider == null) {
      return (
        <Popup message="MetaMask not installed." button={<a href="https://metamask.io/download/" className="flex justify-center items-center w-48 h-10 m-5 ml-2.5 mr-2.5 rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white">Download</a>}/>
      );
    }

    // Switch networks popup
    if (props.network != POLYGON_CHAIN_ID) {
      return <SwitchMessagePopup/>;
    }
        
    // Connect popup
    return (
      <>
        <Popup message="Connect account." button={<button onClick={() => connectAccount()} className="w-48 m-5 ml-2.5 mr-2.5 rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white">Connect with Metamask</button>}/>
      </>
    );
  }

  return (
    <>
      { 
        currentAccount.length !== 0 ? <button onClick={disconnectAccount} className="transition-all duration-200 flex justify-center items-center w-32 h-12 rounded-lg text-lg bg-purple hover:bg-hover-purple hover:text-white">Disconnect</button> : <button onClick={togglePopup} className="transition-all duration-200 flex justify-center items-center w-32 h-12 rounded-lg text-lg bg-purple hover:bg-hover-purple hover:text-white">Connect</button>
      }
      <div>{RenderPopup()}</div>
    </>
  );
}

export default Navbar;
