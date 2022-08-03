import { ethers } from 'ethers';

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

/**
 * Create a new proposal
 * 
 * @param {*} transfer 
 * @param {*} teamAddress 
 * @param {*} grantAmount 
 * @param {*} proposalDescription 
 */
export async function propose([governorAddress, governorABI, governorProvider], proposalDescription) {
  const governor = new ethers.Contract(governorAddress, governorABI, governorProvider);
  // const erc721 = new ethers.Contract(erc721Address, erc721ABI, erc721Provider);
  // const transferCalldata = erc721.interface.encodeFunctionData(transfer, [teamAddress, grantAmount]);

  // console.log("Proposing: " + transfer + "\n");
  console.log("Proposal Description: " + proposalDescription + "\n");

  const proposeTx = await governor.propose(
    //[erc721Address],
    [null],
    [0],
    [null],
    //[transferCalldata],
  );

  const proposeReceipt = await proposeTx.wait(1);
  const proposalId = proposeReceipt.events[0].args.proposalId;
  console.log("Proposed with proposal ID: " + proposalId + "\n");

  const proposalState = await governor.state(proposalId);
  const proposalDeadline = await governor.proposalDeadline(proposalId);

  console.log("Proposal State: " + proposalState);
  console.log("Proposal Deadline: " + proposalDeadline);
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

export async function queueAndExecute([governorAddress, governorABI, provider], description) {
  const governor = new ethers.Contract(governorAddress, governorABI, provider);
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