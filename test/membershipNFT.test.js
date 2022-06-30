const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MembershipNFT", async () => {
  let accounts;
  let membershipNFT;

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
    let receiver = accounts[1];

    await membershipNFT.safeMint(receiver);
    let balance = await membershipNFT.balanceOf(receiver);
    let owner = await membershipNFT.ownerOf(0);

    //TODO: check voting power (before & after token transfer)

    expect(balance).to.equal(1);
    expect(owner).to.equal(receiver);
  });
})
