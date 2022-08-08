//Run this script to check if a wallet has a membership nft
//insert the address you want to check in the wallet_address const
//see README.md for instrunctions on how to configure --network
//const hre = require("hardhat");
async function main() {


const wallet_address = ''
//the following address ending in f0F is the MembershipNFT address
const Mem = await ethers.getContractFactory('MembershipNFT');
const mem = await Mem.attach('0x20fA7529C2F8D4C9f4b9ee9e060Fa0844760Ef0F');


console.log(await mem.balanceOf(wallet_address));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
