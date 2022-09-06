//To use this function fill out gov.execute exactly like propose except instead the of putting the hash in directly change const hash to run it through ethers.utils.id()

const hre = require("hardhat");
async function main() {

    const hash = "Hash goes here"
    
    
    const Gov = await ethers.getContractFactory('Governance');
    const gov = await Gov.attach('0x1fe4CbaA86B9AD6f4f4B3A58Fea1a981a8415C13');

    const tokenAddress = '0xEc23d7c923Bbced5159ffccAfF6678a84CaFFd3e'
    const token = await ethers.getContractAt('ERC20', tokenAddress);

    const teamAddress = '0x9BD68B5c8b557D4507C3F08b403Df144BDc2a93e'
    const grantAmount = 10;
    const transferCalldata = token.interface.encodeFunctionData('transfer', [teamAddress, grantAmount])

    let account_votes = await gov.getVotes('0x7371C62737AbdA16623C74f8b21a2BDc51C03451', 10);
    console.log(account_votes);

    const transaction = await gov.execute(
        [tokenAddress],
        [0],
        [transferCalldata],
        ethers.utils.id(hash),
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
