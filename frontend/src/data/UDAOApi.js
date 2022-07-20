import * as web3Storage from './web3StorageAPI'
import { getVoteData, getActiveStatus, getProposalIDsWithCID } from "./EthersApi";

/*
    Technically, the getGrants and getProposals methods could be combined 
    into one since they basically do the same thing just with
    different file names. They are just separated here for 
    ease of use / readability. 
*/

/**
 * Grabs Proposal ID and CID for every proposal off the blockchain. Uses
 * the CID to query IPFS for title, description, and isGrant. Uses the Proposal ID
 * to query the blockchain for vote data and state.
 * @returns {Array<grants>} - Returns array of grant objects of format 
 * {title, desc, yesVotes, noVotes, isGrant} 
 */
export async function getGrants(){
    let grants = [];
    const proposals = await getProposalIDsWithCID();
    for await (const proposal of proposals) {
        let file = await web3Storage.retrieveArchiveByCid(proposal.cid);
        let text = file[0].text();
        let grant = JSON.parse(text);

        if (grant.isGrant === true) {
            let voteData = await getVoteData(proposal.proposalId);
            let state = await getActiveStatus(proposal.proposalId);
    
            grant.yesVotes = Number(voteData.forVotes._hex);
            grant.noVotes = Number(voteData.againstVotes._hex);
            grant.active = state;
    
            grants.push(grant);
        }
    }
    return grants;
}

/**
 * Grabs Proposal ID and CID for every proposal off the blockchain. Uses
 * the CID to query IPFS for title, description, and isGrant. Uses the Proposal ID
 * to query the blockchain for vote data and state.
 * @returns {Array<proposals>} - Returns array of proposal objects of format 
 * {title, desc, yesVotes, noVotes, isGrant} 
 */
export async function getProposals(){
    let proposalsArray = [];
    const proposals = await getProposalIDsWithCID();
    for await (const proposal of proposals) {
        let file = await web3Storage.retrieveArchiveByCid(proposal.cid);
        let text = file[0].text();
        let prop = JSON.parse(text);

        if (prop.isGrant === false) {
            let voteData = await getVoteData(proposal.proposalId);
            let state = await getActiveStatus(proposal.proposalId);
    
            prop.yesVotes = Number(voteData.forVotes._hex);
            prop.noVotes = Number(voteData.againstVotes._hex);
            prop.active = state;
    
            proposalsArray.push(prop);
        }
    }
    return proposalsArray;
}
