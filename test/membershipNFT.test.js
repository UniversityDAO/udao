const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MembershipNFT", async () => {
  let accounts;
  let membershipNFT;
  const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

  // deploy contract and get HRE accounts
  before(async () => {
    // get the array of hard hat accounts
    accounts = await (await ethers.getSigners()).map((signer) => signer.address);

    const MembershipNFT = await ethers.getContractFactory("MembershipNFT");
    membershipNFT = await MembershipNFT.deploy("UDAOMember", "UDM");
    await membershipNFT.deployed();
  });

  it("is deployed correctly", async () => {
    expect(await membershipNFT.name()).to.equal("UDAOMember");
    expect(await membershipNFT.symbol()).to.equal("UDM");
    expect(await membershipNFT.owner()).to.equal(accounts[0]);
  });

  // check that counter is incremented, NFT received correctly, updates voting power
  it("mints NFTs correctly", async () => {
    // Three accounts are in play: the zero address 0x0, which mints NFTs
    // accounts[0], the owner of the contract and the one that calls safeMint
    // accounts[1], the receiver of the minted NFT
    let receiver = accounts[1];
    let tx = await membershipNFT.safeMint(receiver);

    // CHECK: regular NFT transfer
    let balance = await membershipNFT.balanceOf(receiver);
    let owner = await membershipNFT.ownerOf(0);
    expect(balance).to.equal(1);
    expect(owner).to.equal(receiver);

    // CHECK: voting power is updated
    const receiverSigner = await ethers.getSigner(receiver);
    // call delegate with the receiver to set themselves as the vote delegate
    let tx2 = await membershipNFT.connect(receiverSigner).delegate(receiver);
    let receipt2 = await tx2.wait();
    let [delegateChanged, delegateVotesChanged] = receipt2.events;

    expect(delegateChanged.args.delegator).to.equal(receiver);
    expect(delegateChanged.args.fromDelegate).to.equal(NULL_ADDRESS);
    expect(delegateChanged.args.toDelegate).to.equal(receiver);
    expect(delegateVotesChanged.args.delegate).to.equal(receiver);
    expect(delegateVotesChanged.args.previousBalance).to.equal(0);
    expect(delegateVotesChanged.args.newBalance).to.equal(1);

    // final check to make sure the receiver has actual voting power
    let vote_count = await membershipNFT.getVotes(receiver);
    expect(vote_count).to.equal(1);

    // CHECK: vote supply counter is updated
    let blockNum = await ethers.provider.getBlockNumber();
    let pastTotalSupply = await membershipNFT.getPastTotalSupply(blockNum - 1);
    expect(pastTotalSupply).to.equal(1);
  });
});
