import { ethers } from 'ethers';
import abi from './abi.json';

async function handleMint(polygonAddress: string, uniqueId: string) {
  const { INFURA_RPC_URL, HOT_WALLET_PRIVATE_KEY, MINT_CONTRACT_ADDRESS } =
    process.env;

  const provider = new ethers.providers.JsonRpcProvider(INFURA_RPC_URL);

  const privateKey = HOT_WALLET_PRIVATE_KEY;
  const signer = new ethers.Wallet(privateKey, provider);

  const address = MINT_CONTRACT_ADDRESS;

  const timeCapsuleNftContract = new ethers.Contract(address, abi, signer);

  return timeCapsuleNftContract.mint(polygonAddress, uniqueId);
}

export default handleMint;
