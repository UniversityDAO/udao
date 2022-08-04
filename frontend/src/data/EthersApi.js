import { ethers } from 'ethers';

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

/**
 * Returns voting data for a proposal with id proposalID
 * @param {uint256} proposalId - The Proposal ID for the proposal we want to retrieve data for
 * @param {uint256} address - Address of governor contract
 * @param {JSON} abi - Abi of governor contract
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
 * @param {uint256} address - Address of governor contract
 * @param {JSON} abi - Abi of governor contract
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
 * @param {uint256} address - Address of governor contract
 * @param {JSON} abi - Abi of governor contract
 * @param {JsonRpcProvider} provider - Instance of network we are using
 * @returns {Array} - Return an array of objects, each of format {ProposalID, CID, amount}
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

/**
 * Create a new proposal
 * 
 * @param {*} transfer 
 * @param {*} teamAddress 
 * @param {*} grantAmount 
 * @param {*} proposalDescription the IPFS cid
 */
export async function propose([governorAddress, governorABI, provider], proposalDescription) {
    const signer = provider.getSigner();
    // console.log(signer)
    const governor = new ethers.Contract(governorAddress, governorABI, signer);
    console.log(governor)
    // const erc721 = new ethers.Contract(erc721Address, erc721ABI, erc721Provider);
    // const transferCalldata = erc721.interface.encodeFunctionData(transfer, [teamAddress, grantAmount]);

    console.log("proposing...")
    const proposeTx = await governor.connect(signer).propose(
        [NULL_ADDRESS],
        [0],
        [0],
        proposalDescription
    );
    console.log('hi')

    const proposeReceipt = await proposeTx.wait();
    const proposalId = proposeReceipt.events[0].args.proposalId;
    console.log("Proposed with proposal ID: " + proposalId + "\n");

    const proposalState = await governor.state(proposalId);
    const proposalDeadline = await governor.proposalDeadline(proposalId);

    console.log("Proposal State: " + proposalState);
    console.log("Proposal Deadline: " + proposalDeadline);

    return proposalId;
}

/**
 * Vote on a proposal
 * 
 * @param {*} proposalId 
 * @param {*} support 
 * @param {*} reason 
 */
 export async function vote([governorAddress, governorABI, provider], proposalId, support, reason) {
    const signer = provider.getSigner();
    const governor = new ethers.Contract(governorAddress, governorABI, signer);
    const voteTx = await governor.connect(signer).castVoteWithReason(proposalId, support, reason);

    const voteTxReceipt = await voteTx.wait();
    console.log(voteTxReceipt.events[0].args);
    // const proposalState = await governor.state(proposalId);
    // console.log("Current proposal state: " + proposalState);  
}

/**
 * Delegate ERC721 to `delagatee`
 * @param {*} delegatee the address to delegate ERC721 to
 */
export async function delegate([membershipNFTAddress, membershipNFTabi, provider], delegatee) {
    const signer = provider.getSigner();
    const membershipNFT = new ethers.Contract(membershipNFTAddress, membershipNFTabi, signer);
    await membershipNFT.delegate(delegatee);

    //TODO: may do something with result of delegate() call
    console.log("delegated NFT");
}

export async function queueAndExecute([governorAddress, governorABI, governorProvider], description) {
  const governor = new ethers.Contract(governorAddress, governorABI, governorProvider);
  // const erc721 = new ethers.Contract(erc721Address, erc721ABI, erc721Provider);
  // const transferCalldata = erc721.interface.encodeFunctionData();
  const descriptionHash = ethers.utils.id(description);
  const queueTx = await governor.queue(
    //[erc721Address],
    [null],
    [0],
    [null],
    //[transferCalldata],
    descriptionHash
  );
  await queueTx.wait(1)

  console.log("Executing...");

  const executeTx = await governor.execute(
    //[erc721Address],
    [null],
    [0],
    [null],
    //[transferCalldata],
    descriptionHash
  )

  await executeTx.wait(1);
}