const hre = require("hardhat");
async function main() {

//paste your wallet address in here
//ensure the address you are running from matches
const wallet_address = ''

//0x20...f0F is the MembershipNFT contract on the mumbai test network.
const Mem = await ethers.getContractFactory('MembershipNFT');
const mem = await Mem.attach('0x20fA7529C2F8D4C9f4b9ee9e060Fa0844760Ef0F');


await mem.delegate(wallet_address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
