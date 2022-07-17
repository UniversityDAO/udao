import { ethers } from 'ethers';
import { govAddress, tokenAddress, nftAddress } from './config';
import { govAbi, tokenAbi, nftAbi } from './config';

/**
 * This function will be used to take our proposal data from the application
 * and pass it through the Keccak256 hash to be used in the Solidity propsose() function
 * @param {Object} jsonObject - A proposal/grant JSON object just containing fields from the application form
 * @returns {Keccak256 Hash} - ethers.utils.id() generates a Keccak256 hash for whatever is passed in as an argument
 */
export function generateHash(jsonObject) {
    return ethers.utils.id(jsonObject);
}

/**
 * This function takes in a Proposal ID and then accesses the governance 
 * contract to see what the voting data is for this proposal
 * @param {uint256} proposalId - The Proposal ID for the proposal we want to retrieve data for
 * @returns {Object} - Return an object of format {forVotes, againstVotes, obstainVotes}
 */
export async function getVoteData(proposalId) {
    let address = govAddress();
    let abi = govAbi();
    let provider = new ethers.providers.JsonRpcProvider();
    
    const gov = new ethers.Contract(address, abi, provider);
    let voteData = await gov.proposalVotes(proposalId);
    return voteData;
}

/**
 * This function takes in a Proposal ID and then accesses the governance
 * contract to see if this proposal is active or not 
 * @param {uint256} proposalId - The Proposal ID for the proposal we want to retrieve data for
 * @returns {enum} - Return an enum where active == 1. See enum IGovernor.ProposalState on Open Zeppelin
 */
export async function getActiveStatus(proposalId) {
    let address = govAddress();
    let abi = govAbi();
    let provider = new ethers.providers.JsonRpcProvider();
    
    const gov = new ethers.Contract(address, abi, provider);

    let state = await gov.state(proposalId);
    return state;
}

export async function getProposalIDsWithCID() {
    let proposals = [];
    let address = govAddress();
    let abi = govAbi();
    let provider = new ethers.providers.JsonRpcProvider();

    const gov = new ethers.Contract(address, abi, provider);

    const filters = await gov.filters.ProposalCreated();
    const logs = await gov.queryFilter(filters, 0, "latest");
    const events = logs.map((log) => gov.interface.parseLog(log));

    let id, cid, proposal;

    events.forEach(event => {
        console.log(event);
        proposal = {};
        id = Number(event.args.proposalId._hex)
        cid = event.args.description;
        proposal.proposalId = id;
        proposal.cid = cid;
        console.log(proposal.cid);
        proposals.push(proposal);
    })

    return proposals;
}