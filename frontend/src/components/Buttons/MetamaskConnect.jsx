import MetaMaskOnboarding from '@metamask/onboarding';
import React, { useRef, useEffect } from 'react';

function MetamaskConnect ()
{

const ref1=useRef(null);
const ref2=useRef(null);
const ref3=useRef(null);

const onboarding = new MetaMaskOnboarding();

useEffect(() => {
    const btn = ref1.current;
    const statusText=ref2.current;
    const statusDesc=ref3.current;


    const { ethereum } = window;


    const isMetaMaskInstalled = () => {
        return Boolean(ethereum && ethereum.isMetaMask);
    }

    let connected = (accounts) => {
        statusText.innerHTML = ''
        statusDesc.classList.add('account');
        statusDesc.style.backgroundColor = "white";
        statusDesc.innerHTML = 'Connected to UDAO: ' + accounts[0];
        btn.style.display = 'none';
        statusDesc.classList.add('account');
    }

    async function connectWallet() {
        return await ethereum.request({ method: 'eth_accounts' });
    }

    const onClickInstallMetaMask = () => {
        onboarding.startOnboarding();
    }

    btn.addEventListener('click', async () => {
        btn.style.backgroundColor = '#cccccc';

        try {
            const accounts = await ethereum.request({method: 'eth_requestAccounts'})
            connected(accounts)
        } catch (error) {
            console.error(error);
        }
    }, []);

    const MetaMaskClientCheck = () => {
        if (!isMetaMaskInstalled()) {
            btn.innerText = 'Install MetaMask'
            btn.onclick = onClickInstallMetaMask;
        } else {
    
            connectWallet().then((accounts) => {
                if (accounts && accounts[0] > 0) {
                    connected(accounts)
                } else {
                    btn.innerText = 'Connect Wallet'
                }
            })
        }
    }

    MetaMaskClientCheck();

});

return (
    <>
        <button ref={ref1} style={{textAlign:'right', marginTop: "20px"}} className="btn btn-primary">Connect Wallet</button>
        <h1 ref={ref2}> </h1>
        <p ref={ref3}></p>
    </>
    )
}

export default MetamaskConnect;