import { ethers } from 'ethers';
import { GOV_ADDRESS, TOKEN_ADDRESS, NFT_ADDRESS } from './config';
import { GOV_ABI, TOKEN_ABI, NFT_ABI } from './config';

/**
 * Returns voting data for a proposal with id proposalID
 * @param {uint256} proposalId - The Proposal ID for the proposal we want to retrieve data for
 * @returns {Object} - Return an object of format {forVotes, againstVotes, obstainVotes}
 */
export async function getVoteData(proposalId) {
    let address = GOV_ADDRESS;
    let abi = GOV_ABI;
    let provider = new ethers.providers.JsonRpcProvider();
    
    const gov = new ethers.Contract(address, abi, provider);
    let voteData = await gov.proposalVotes(proposalId);
    return voteData;
}

/**
 * Return proposal active status for a particular proposalID 
 * @param {uint256} proposalId - The Proposal ID for the proposal we want to retrieve data for
 * @returns {enum} - Return an enum where active == 1. See enum IGovernor.ProposalState on Open Zeppelin
 */
export async function getActiveStatus(proposalId) {
    let address = GOV_ADDRESS;
    let abi = GOV_ABI;
    let provider = new ethers.providers.JsonRpcProvider();
    
    const gov = new ethers.Contract(address, abi, provider);

    let state = await gov.state(proposalId);
    return state;
}

/**
 * Filters through all ProposalCreated event logs and
 * retrieves the Proposal ID and CID (description string) for all proposals
 * @returns {Array} - Return an array of objects, each of format {ProposalID, CID}
 */
export async function getProposalIDsWithCID() {
    let proposals = [];
    let address = GOV_ADDRESS;
    let abi = GOV_ABI;
    let provider = new ethers.providers.JsonRpcProvider();

    const gov = new ethers.Contract(address, abi, provider);

    const filters = await gov.filters.ProposalCreated();
    const logs = await gov.queryFilter(filters, 0, "latest");
    const events = logs.map((log) => gov.interface.parseLog(log));

    let id, cid, proposal;

    events.forEach(event => {
        proposal = {};
        id = Number(event.args.proposalId._hex)
        cid = event.args.description;
        proposal.proposalId = id;
        proposal.cid = cid;
        proposals.push(proposal);
    })

    return proposals;
}
