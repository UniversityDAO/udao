import * as web3Storage from './web3StorageAPI';
import { Proposal } from '../data/classes';
import { getVoteData, getActiveStatus, getProposalCreatedEvents } from "./EthersApi";

/**
 * Returns all proposals created from app, represented by Proposal objects
 * @param {uint256} address - Address of governance contract
 * @param {JSON} abi - Abi of governance contract
 * @param {JsonRpcProvider} provider - Instance of network we are using
 * @returns {Array<Proposal>} - array of Proposal objects
 */
export async function getAllProposals(address, abi, provider) {
    let proposals = [];
    const proposalCreatedEvents = await getProposalCreatedEvents(address, abi, provider);

    for await (const event of proposalCreatedEvents) {
        try {
            let file = await web3Storage.retrieveArchiveByCid(event.description);
            if (JSON.parse(await file[0].text())) {
                let ipfsMetadata = JSON.parse(await file[0].text());

                let voteData = await getVoteData(event.proposalId, address, abi, provider);
                let state = await getActiveStatus(event.proposalId, address, abi, provider);

                let proposal = new Proposal(event, ipfsMetadata, voteData, state);
                proposals.push(proposal);
            }
        } catch (e) {
            console.error(e);
        }
    }
    return proposals;
}