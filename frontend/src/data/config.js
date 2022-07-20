import govData from "./artifacts/contracts/Governance.sol/Governance.json";
import nftData from "./artifacts/contracts/MembershipNFT.sol/MembershipNFT.json";
import tokenData from "./artifacts/contracts/UDAOToken.sol/UDAOToken.json";

export const WEB3_ACCESS_TOKEN = process.env.WEB3STORAGE_TOKEN;

export const GOV_ADDRESS = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
export const NFT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
export const TOKEN_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

export const GOV_ABI = govData.abi;
export const NFT_ABI = nftData.abi;
export const TOKEN_ABI = tokenData.abi;
