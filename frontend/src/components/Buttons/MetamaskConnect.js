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
        statusText.innerHTML = 'Connected!'
        statusDesc.classList.add('account');
        statusDesc.innerHTML = accounts[0]
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
    })

    const MetaMaskClientCheck = () => {
        if (!isMetaMaskInstalled()) {
            statusText.innerText = 'You need to Install a Wallet';
            statusDesc.innerText = 'We recommend the MetaMask wallet.';
            btn.innerText = 'Install MetaMask'
            btn.onclick = onClickInstallMetaMask;
        } else {
    
            connectWallet().then((accounts) => {
                if (accounts && accounts[0] > 0) {
                    connected(accounts)
                } else {
                    statusText.innerHTML = 'Connect your wallet'
                    statusDesc.innerHTML = `To begin, please connect your MetaMask wallet.`
                    btn.innerText = 'Connect MetaMask'
                }
            })
        }
    }

    MetaMaskClientCheck();

});

return (
    <>
        <button ref={ref1} style={{textAlign:'right', marginTop: "20px"}}>Connect Wallet</button>
        <h1 ref={ref2}> </h1>
        <p ref={ref3}></p>
    </>
    )
}

export default MetamaskConnect;