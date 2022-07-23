import { ethers } from 'ethers';

/**
 * Returns voting data for a proposal with id proposalID
 * @param {uint256} proposalId - The Proposal ID for the proposal we want to retrieve data for
 * @param {uint256} address - Address of governance contract
 * @param {JSON} abi - Abi of governance contract
 * @param {JsonRpcProvider} provider - Instance of network we are using
 * @returns {Object} - Return an object of format {forVotes, againstVotes, obstainVotes}
 */
export async function getVoteData(proposalId, address, abi, provider) {
    const gov = new ethers.Contract(address, abi, provider);
    let voteData = await gov.proposalVotes(proposalId);
    return voteData;
}

/**
 * Return proposal active status for a particular proposalID 
 * @param {uint256} proposalId - The Proposal ID for the proposal we want to retrieve data for
 * @param {uint256} address - Address of governance contract
 * @param {JSON} abi - Abi of governance contract
 * @param {JsonRpcProvider} provider - Instance of network we are using
 * @returns {enum} - Return an enum where active == 1. See enum IGovernor.ProposalState on Open Zeppelin
 */
export async function getActiveStatus(proposalId, address, abi, provider) {
    const gov = new ethers.Contract(address, abi, provider);

    let state = await gov.state(proposalId);
    return state;
}

/**
 * Filters through all ProposalCreated event logs and
 * retrieves the Proposal ID and CID (description string) for all proposals
 * @param {uint256} address - Address of governance contract
 * @param {JSON} abi - Abi of governance contract
 * @param {JsonRpcProvider} provider - Instance of network we are using
 * @returns {Array} - Return an array of objects, each of format {ProposalID, CID}
 */
export async function getProposalData(address, abi, provider) {
    let proposals = [];
    
    const gov = new ethers.Contract(address, abi, provider);

    const filters = await gov.filters.ProposalCreated();
    const logs = await gov.queryFilter(filters, 0, "latest");
    const events = logs.map((log) => gov.interface.parseLog(log));

    let id, cid, grantAmount, proposal;
    events.forEach(event => {
        proposal = {};
        id = String(event.args.proposalId._hex)
        cid = event.args.description;
        grantAmount = Number(event.args[3][0]._hex);
        proposal.proposalId = id;
        proposal.cid = cid;
        proposal.amount = grantAmount; 
        proposals.push(proposal);
    })
    return proposals;
}
