import * as web3Storage from './web3StorageAPI'
import { getVoteData, getActiveStatus, getProposalData } from "./EthersApi";

/**
 * Grabs Proposal ID and CID for every proposal off the blockchain. Uses
 * the CID to query IPFS for title, description, and isGrant. Uses the Proposal ID
 * to query the blockchain for vote data and state.
 * @param {uint256} address - Address of governance contract
 * @param {JSON} abi - Abi of governance contract
 * @param {JsonRpcProvider} provider - Instance of network we are using
 * @returns {Array<proposals>} - Returns array of proposal objects of format 
 * {title, desc, yesVotes, noVotes, isGrant}
 */
export async function getAllProposals(address, abi, provider) {
    let proposalsArray = [];
    const proposals = await getProposalData(address, abi, provider);

    for await (const proposal of proposals) {
        try {
            let file = await web3Storage.retrieveArchiveByCid(proposal.cid);
            let text = await file[0].text();
            let prop = JSON.parse(text);
    
            let voteData = await getVoteData(proposal.proposalId, address, abi, provider);
            let state = await getActiveStatus(proposal.proposalId, address, abi, provider);
    
            prop.yesVotes = Number(voteData.forVotes._hex);
            prop.noVotes = Number(voteData.againstVotes._hex);
            prop.active = state;
            prop.amount = proposal.amount;
    
            console.log(prop)
            proposalsArray.push(prop);
        } catch (e) {
            console.error(e);
        }
    }
    return proposalsArray;
}