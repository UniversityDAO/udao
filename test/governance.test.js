const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Governance", () => {
  let governance, membershipNFT, accounts, votingMember;
  const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

  // deploy contract and get HRE accounts
  before(async () => {
    accounts = await (await ethers.getSigners());

    // deploy NFT contract to link as IVotes token contract
    const MembershipNFT = await ethers.getContractFactory("MembershipNFT");
    membershipNFT = await MembershipNFT.deploy("UDAOMember", "UDM");
    await membershipNFT.deployed();

    // deploy governance contract
    const Governance = await ethers.getContractFactory("Governance");
    governance = await Governance.deploy(membershipNFT.address, "UDAOGovernance");
    await governance.deployed();

    // create a member, for easier later testing
    votingMember = accounts[2];
    await membershipNFT.safeMint(votingMember.address);
    await membershipNFT.connect(votingMember).delegate(votingMember.address);
  });

  it("is deployed correctly", async () => {
    expect(await governance.name()).to.equal("UDAOGovernance");
    expect(await governance.version()).to.equal("1");
  });

  let proposalId; // proposalId used for later tests
  // creation of proposals
  // test that only members can create proposals, ie, those with a MembershipNFT
  it("members can create proposals", async () => {
    let member = accounts[0];

    // mint and delegate NFT for member
    await membershipNFT.safeMint(member.address);
    await membershipNFT.delegate(member.address);

    // CHECK: member can create a proposal
    const tx = await governance.propose([NULL_ADDRESS], [0], [0], "ipfs hash");
    let receipt = await tx.wait();
    let eventArgs = receipt.events[0].args;
    proposalId = eventArgs.proposalId;
    
    // compute snapshot and deadline by hand for extra testing
    let blockNum = await ethers.provider.getBlockNumber();
    let votingDelay = await governance.votingDelay();
    let snapshot = Number(blockNum) + Number(votingDelay.toNumber());
    let votingPeriod = await governance.votingPeriod();
    let deadline = snapshot + Number(votingPeriod.toNumber());
    
    expect(await governance.state(proposalId)).to.equal(0); // 0 == ProposalState.pending
    expect(await governance.proposalSnapshot(proposalId)).to.equal(eventArgs.startBlock);
    expect(await governance.proposalDeadline(proposalId)).to.equal(eventArgs.endBlock);
    // extra sanity checks
    expect(await governance.proposalSnapshot(proposalId)).to.equal(snapshot);
    expect(await governance.proposalDeadline(proposalId)).to.equal(deadline);
  });

  it("nonmembers cannot create proposals", async () => {
    let nonMember = accounts[1];

    // CHECK: nonmember cannot create proposal
    const nonMemberPropose = governance.connect(nonMember).propose([NULL_ADDRESS], [0], [0], "ipfs hash");
    await expect(nonMemberPropose)
      .to
      .be
      .revertedWith("Governor: proposer votes below proposal threshold");
  });

  // voting on proposals
  // test that only members can vote on proposals
  // test the quorum requirement, that proposals can only pass if they meet the quorum
  it("members can vote on proposals", async () => {
    await governance.connect(votingMember).castVote(proposalId, 1); // For == 1
    expect(await governance.hasVoted(proposalId, votingMember.address)).to.equal(true);
    let tx = await governance.proposalVotes(proposalId);
    expect(tx.forVotes).to.equal(1);
    expect(tx.againstVotes).to.equal(0);
    expect(tx.abstainVotes).to.equal(0);
  });

  it("nonmembers cannot vote on proposals", async () => {
    let nonMember = accounts[1];
    // NOTE: if nonmember attempts to cast vote, no error is thrown. The vote is still "cast", but
    // since they have no voting power, it will not affect the count at all. Should probably restrict
    // the voting in the UI
    await governance.connect(nonMember).castVote(proposalId, 0);
    expect(await governance.hasVoted(proposalId, nonMember.address)).to.equal(true);
    let tx = await governance.proposalVotes(proposalId);
    expect(tx.forVotes).to.equal(1);
    expect(tx.againstVotes).to.equal(0);
    expect(tx.abstainVotes).to.equal(0);
  });

  // NOTE: commenting out because voting period is 1 week
  // it("proposals only pass if they meet the quorum", async () => {
  //   let tx = await governance.state(proposalId);
  //   expect(tx).to.equal(4);
  // });
})
