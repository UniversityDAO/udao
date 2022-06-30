const hre = require("hardhat");

// This tests the transfer of ERC-20 tokens
// TODO: should probably move to the initial script where these contracts are deployed, so they can access
// the addresses of those contracts, without having to hardcode them in.
async function main() {
    const MemContractFactory = await ethers.getContractFactory('MembershipNFT');

    // should probably dynamically set address instead of hardcode
    // attaches an instance of the NFT contract (since it is already deployed)
    const memContract = await MemContractFactory.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3');

    // mint NFT to 4 users. NOTE: probably better to not hardcode addresses
    await memContract.safeMint('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
    await memContract.safeMint('0x70997970C51812dc3A010C7d01b50e0d17dc79C8');
    await memContract.safeMint('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');
    await memContract.safeMint('0x90F79bf6EB2c4f870365E785982E1f101E93b906');

    const TokContractFactory = await ethers.getContractFactory('UDAOToken');
    const tokContract = await TokContractFactory.attach('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512');

    await tokContract.transfer('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', 100);
    await console.log(await tokContract.balanceOf('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
