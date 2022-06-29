const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MembershipNFT", () => {
  it("is deployed correctly", async () => {
    const MembershipNFT = await ethers.getContractFactory("MembershipNFT");
    const membershipNFT = await MembershipNFT.deploy("UDAOMember", "UDM");
    await membershipNFT.deployed();

    expect(await membershipNFT.name()).to.equal("UDAOMember");
    expect(await membershipNFT.symbol()).to.equal("UDM");
    // expect(await membershipNFT.owner()).to.equal(account[1]);
  });

  //TODO: check that _mint can't be called externally
  it("only allows owner to mint", async () => {
    
  });

  // check that counter is incremented, NFT received correctly, updates voting power
  it("mints NFTs correctly", async () => {

  });
})
