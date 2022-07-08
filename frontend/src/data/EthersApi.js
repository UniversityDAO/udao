const { ethers } = require("hardhat");

//For the sake of testing:
//MembershipNFT address = 0x5FbDB2315678afecb367f032d93F642f64180aa3
//UDAOToken address = 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
//Governor address = 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0

// Function retrieves vote data from a given array of proposalIds
async function getBlockchainData(proposalIds) {
    let proposals = [];

    // Get an instance of our Governance contract
    const gov = await ethers.getContractAt("Governance", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");

    //Loop through all proposalIds passed in, and at each one find the vote data
    await Promise.all(proposalIds.map(async (proposalId) => {
        proposals.push(await gov.proposalVotes(proposalId));
    }));

    //Return all vote data
    return proposals;
}

// Function generates 11 mock proposal objects
// Entirely for testing
async function generateMockProposals() {
    let proposalIDs = [];

    // Get an instance of our Governance contract
    const gov = await ethers.getContractAt("Governance", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
    await gov.deployed();

    //Get an instance of our UDAO Token contract
    const tokenAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
    const token = await ethers.getContractAt('ERC20', tokenAddress);

    //Data to feed into our propose() function for hashing
    const teamAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
    const grantAmount = 10;
    const transferCalldata = token.interface.encodeFunctionData('transfer', [teamAddress, grantAmount]);

    //Create 11 mock proposals and push the IDs of each one into an array
    for (let i=0; i<=10; i++) {
        const proposal = await gov.propose([tokenAddress], [i], [transferCalldata], "Hash goes here");
        const receipt = await proposal.wait();

        const proposalID = await receipt.events[0].args.proposalId;
        proposalIDs.push(proposalID);
    }
    //Return our array of ProposalIDs
    return proposalIDs;
}

async function main() {
    let proposalIds = await generateMockProposals();
    let props = await getBlockchainData(proposalIds);
    console.log(props);
}

main();