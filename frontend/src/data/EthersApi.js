import { ethers } from 'ethers';
import { govAddress, tokenAddress, nftAddress } from './config';
import { govAbi, tokenAbi, nftAbi } from './config';

export function generateHash(jsonObject) {
    return ethers.utils.id(jsonObject);
}

export async function getVoteData(proposalId) {
    let address = govAddress();
    let abi = govAbi();
    let provider = new ethers.providers.JsonRpcProvider();
    
    const gov = new ethers.Contract(address, abi, provider);
    let voteData = await gov.proposalVotes(proposalId);
    return voteData;
}

export async function getActiveStatus(proposalId) {
    let address = govAddress();
    let abi = govAbi();
    let provider = new ethers.providers.JsonRpcProvider();
    
    const gov = new ethers.Contract(address, abi, provider);

    let state = await gov.state(proposalId);
    console.log(`State is equal to: ${state}`);
    return state;
}
