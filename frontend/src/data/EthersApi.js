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
    /*
    await Promise.all(proposalIds.map(async (proposalId) => {
        proposals.push(await gov.proposalVotes(proposalId));
    }));

    */
    let votes;
    for(let i=0; i<proposalIds.length; i++){
        votes = await gov.proposalVotes(proposalIds[i]);
        proposals.push({
            id: proposalIds[i],
            votes: votes    
        });
    }

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

async function simulateVoting(proposalIds) {
    // Get an instance of our Governance contract
    const gov = await ethers.getContractAt("Governance", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
    await gov.deployed();

    const membershipNFT = await ethers.getContractAt("MembershipNFT", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
    await membershipNFT.deployed();

    let accounts;
    accounts = await ethers.getSigners();

    // make all accounts members
    await Promise.all(accounts.map(async (account) => {
        let votingMember = account;
        await membershipNFT.safeMint(votingMember.address);
        await membershipNFT.connect(votingMember).delegate(votingMember.address);
    }));

    let voteCount = 0;
    let receipt;
    let vote;
    // At every proposal ID, every account will vote a random integer (0 or 1)
    await Promise.all(proposalIds.map(async (proposalId) => {
        console.log(`Now Voting on ProposalID: ${proposalId}`);
        await Promise.all(accounts.map(async (account) => {
            let support = Math.round(Math.random());
            console.log(`   Account ${account.address} will vote ${support} for the proposal`);
            vote = await gov.connect(account).castVote(proposalId, support);
            receipt = await vote.wait();
            console.log(receipt.events[0].args);
            //voteCount = await receipt.events[0].balance;
            console.log(`       Response from castVote - account: ${account.address},  voteCount: ${voteCount})}`);
        }));
    }));
}

async function simulateVotingV2(proposalIds) {
    // Get an instance of our Governance contract
    const gov = await ethers.getContractAt("Governance", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
    await gov.deployed();

    const membershipNFT = await ethers.getContractAt("MembershipNFT", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
    await membershipNFT.deployed();

    let accounts;
    accounts = await ethers.getSigners();

    for(let a=0; a<accounts.length; a++){
        await membershipNFT.safeMint(accounts[a].address);
        await membershipNFT.connect(accounts[a]).delegate(accounts[a].address);
    }

    //let proposals = [];
    let support, vote, receipt, forVotes, againstVotes;
    for(let p=0; p<proposalIds.length; p++){

        console.log(`Now Voting on ProposalID: ${proposalIds[p]}`);

        for(let a=0; a<accounts.length; a++){
            support = Math.round(Math.random());
            console.log(`   Account ${accounts[a].address} will vote ${support} for the proposal.`);
            
            vote = await gov.connect(accounts[a]).castVote(proposalIds[p], support);
            receipt = await vote.wait();
            console.log(`       Vote of ${receipt.events[0].args[2]} completed.`);
            //console.log(`       receipt: ${JSON.stringify(receipt)}`);
        }
    }
}


async function main() {
    console.log(`main: ${new Date().toISOString()}`);
    let proposalIds = await generateMockProposals();
    //await simulateVoting(proposalIds);
    await simulateVotingV2(proposalIds);
    let props = await getBlockchainData(proposalIds);
    console.log(props);
}

main();