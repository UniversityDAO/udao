const hre = require("hardhat");

async function main() {

  const UDAOToken = await hre.ethers.getContractFactory("UDAOToken");
  const udaotoken = await UDAOToken.deploy();

  await udaotoken.deployed();
  console.log("UDAOToken deployed to:", udaotoken.address);
}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });