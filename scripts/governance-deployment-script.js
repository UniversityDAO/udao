const hre = require("hardhat");
async function main() {
    const MyGovernor = await ethers.getContractFactory("Governance");
    console.log("Deploying MyGovernor");
    const myGovernor = await MyGovernor.deploy("0x5FbDB2315678afecb367f032d93F642f64180aa3", "My Governor");
    // possible cause of bug in next line?
    const deployedGovernor  = await myGovernor.deployed()
    console.log("MyGovernor deployed to:", myGovernor.address);
  }

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
