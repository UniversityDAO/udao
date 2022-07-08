const hre = require("hardhat");
async function main() {

//hardcoded address must be deployed in order:
	//the order is membershipnft, erc20, governance
	//the auto-deploy python script will do this for you

//the following address ending in aa3 is the MembershipNFT address
const Mem = await ethers.getContractFactory('MembershipNFT');
const mem = await Mem.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3');
//address 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb9226 is account number zero the three following addresses are accounts number one, two, and three.
await mem.safeMint('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
await mem.safeMint('0x70997970C51812dc3A010C7d01b50e0d17dc79C8');
await mem.safeMint('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');
await mem.safeMint('0x90F79bf6EB2c4f870365E785982E1f101E93b906');

//receiver is the defualt address used by hardhat(account0)
receiver = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

const receiverSigner = await ethers.getSigner(receiver);
// call delegate with the receiver to set themselves as the vote delegate
let tx2 = await mem.connect(receiverSigner).delegate(receiver);

const Tok = await ethers.getContractFactory('UDAOToken');
const tok = await Tok.attach('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512');

//address ending in 6e0: is governance contract
await tok.transfer('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', 100);
await console.log(await tok.balanceOf('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

