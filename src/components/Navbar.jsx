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
import { useDispatch, useSelector } from 'react-redux';
import { setAccount, setMetamaskProvider } from '../../reduxActions';

import { POLYGON_CHAIN_ID } from "../data/config";

// import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

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
      <div className="w-full h-20 flex justify-end">
        {accounts.length !== 0 && network !== POLYGON_CHAIN_ID ? <SwitchMessagePopup/> : null}
        <button className="w-48 m-5 ml-2.5 mr-2.5 rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white" onClick={() => checkAndDelegate()}>Delegate (To Self)</button>
        <ConnectButton metamaskProvider={metamaskProvider} network={network} />
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

function SwitchMessagePopup() {
    const metamaskProvider = useSelector(state => state.metamaskProvider);

    const switchNetwork = async () => {
        try {
            await metamaskProvider.provider
                .request({ 
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
      <div className="p-5 flex flex-col justify-center items-center fixed top-0 left-0 w-screen h-screen bg-black/80">
        <div className="p-5 flex flex-col justify-center items-center rounded-lg bg-gray">
          <p className="text-2xl">This app only works on Polygon mainnet.</p>
          <button onClick={() => switchNetwork()} className="w-48 h-10 m-5 ml-2.5 mr-2.5 rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white">Switch Network</button>
        </div>
      </div>
    )
}

function ConnectButton(props) {
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
    }

    const renderMainMessage = () => {
        if (metamaskProvider == null) {
            // render install metamask msg
            return (
                <div>
                  <div className="p-5 flex flex-col justify-center items-center fixed top-0 left-0 w-screen h-screen bg-black/80">
                    <div className="p-5 flex flex-col justify-center items-center rounded-lg bg-gray">
                      <p className="text-2xl">Metamask Not Installed</p>
                      <a href="https://metamask.io/download/" className="flex justify-center items-center w-48 m-5 ml-2.5 mr-2.5 rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white">Download Metamask</a>
                    </div>
                  </div>
                </div>
            );
        } else if (props.network != POLYGON_CHAIN_ID) {
            return <SwitchMessagePopup/>;
        } else {
            // render connect button
            return (
              <div className="p-5 flex flex-col justify-center items-center fixed top-0 left-0 w-screen h-screen bg-black/80">
                <div className="p-5 flex flex-col justify-center items-center rounded-lg bg-gray">
                  <p className="text-2xl">Connect</p>
                  <button onClick={() => connectAccount()} className="w-48 m-5 ml-2.5 mr-2.5 rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white">Connect with Metamask</button>
                </div>
              </div>
            );
        }
    }

    return (
        <>
            {
            currentAccount.length !== 0 ? 
            <button className="w-48 m-5 ml-2.5 mr-2.5 rounded-lg text-lg bg-purple"><span className="text-sm">Connected To: </span>{currentAccount[0].slice(0,5) + '...' + currentAccount[0].slice(-3)}</button> :
                <Popup
                    trigger={<button className="w-48 m-5 ml-2.5 mr-2.5 rounded-lg text-lg cursor-pointer bg-purple hover:bg-hover-purple hover:text-white">Connect Wallet</button>}
                    modal
                    nested
                >
                    {close => (
                    <div>
                        <button onClick={close}>&times;</button>
                        <div>{renderMainMessage()}</div>
                    </div>
                    )}
                </Popup>
            }
        </>

    );
}

export default Navbar;
