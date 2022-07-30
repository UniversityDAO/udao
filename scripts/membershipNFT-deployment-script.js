
async function main() {
  const MembershipNFT = await hre.ethers.getContractFactory("MembershipNFT");
  const membershipNFT = await MembershipNFT.deploy('UDAOMembership', 'UDAO');

  await membershipNFT.deployed();
  console.log("MembershipNFT deployed to:", membershipNFT.address);
  
}
  

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

