const hre = require("hardhat");
async function main() {
    const Gov = await ethers.getContractFactory('Governance');
    const gov = await Gov.attach('0x1fe4CbaA86B9AD6f4f4B3A58Fea1a981a8415C13');

 
    const proposalId = '101534052403356643527143640906478212367365379399099391818715724163758882499403'
    const support = 1

    let account_votes = await gov.getVotes('0x7371C62737AbdA16623C74f8b21a2BDc51C03451', 10);
    console.log(account_votes);

    data = await gov.castVote(
        proposalId,
        support
    );

    console.log(data)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

