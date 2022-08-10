import govData from "./artifacts/contracts/Governance.sol/Governance.json";
import nftData from "./artifacts/contracts/MembershipNFT.sol/MembershipNFT.json";
import tokenData from "./artifacts/contracts/UDAOToken.sol/UDAOToken.json";

//export const WEB3_ACCESS_TOKEN = process.env.WEB3STORAGE_TOKEN;

// mumbai addresses
export const GOV_ADDRESS = '0x1fe4CbaA86B9AD6f4f4B3A58Fea1a981a8415C13'
export const NFT_ADDRESS = '0x20fA7529C2F8D4C9f4b9ee9e060Fa0844760Ef0F'
export const TOKEN_ADDRESS = '0xEc23d7c923Bbced5159ffccAfF6678a84CaFFd3e'

export const GOV_ADDRESS_LOCAL = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
export const NFT_ADDRESS_LOCAL = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
export const TOKEN_ADDRESS_LOCAL = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

export const GOV_ABI = govData.abi;
export const NFT_ABI = nftData.abi;
export const TOKEN_ABI = tokenData.abi;