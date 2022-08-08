//To use this function change the const member to the address you would like to mint to and run npx hardhat --network mumbai
//where mumbai is the network
//change hash to to the coresponding ipfs hash

const hre = require("hardhat");
async function main() {

    const member = '0x9BD68B5c8b557D4507C3F08b403Df144BDc2a93e'
    const hash = "bafybeifqwvtkt4roksibon7n4k27spw3namcug5favqw43wmbxun46wupe"
    
    
    const Gov = await ethers.getContractFactory('Governance');
    const gov = await Gov.attach('0x1fe4CbaA86B9AD6f4f4B3A58Fea1a981a8415C13');


//tokenAddress is the erc721 contract ending in f0F
    const Mem = await ethers.getContractFactory('MembershipNFT');
    const mem = await Mem.attach('0x20fA7529C2F8D4C9f4b9ee9e060Fa0844760Ef0F');

    const tokenAddress = '0x20fA7529C2F8D4C9f4b9ee9e060Fa0844760Ef0F'



    // mem.interface.encodeFunctionData the first argument is a string of the name of the function on the contract the second is an array of the parameters
    const transferCalldata = mem.interface.encodeFunctionData('safeMint',[member])

    const transaction = await gov.propose(
        [tokenAddress],
        [0],
        [transferCalldata],
        hash,
    );
    let receipt = await transaction.wait();
    console.log(receipt.events[0].args);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
