const hre = require("hardhat");
async function main() {

const Gov = await ethers.getContractFactory('Governance');
const gov = await Gov.attach('0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0');

const tokenAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
const token = await ethers.getContractAt('ERC20', tokenAddress);

const teamAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
const grantAmount = 10;
const transferCalldata = token.interface.encodeFunctionData('transfer', [teamAddress, grantAmount])

await gov.propose(
    [tokenAddress],
    [0],
    [transferCalldata],
    "Hash goes here",
);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
