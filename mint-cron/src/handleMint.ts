import axios from 'axios';
import https from 'https';
import { ethers } from 'ethers';
import { config } from 'dotenv';
import abi from './abi.json';

config();

async function handleMint(polygonAddress: string, uniqueId: string) {
  const {
    INFURA_RPC_URL,
    HOT_WALLET_PRIVATE_KEY,
    MINT_CONTRACT_ADDRESS,
    NETWORK,
  } = process.env;

  const gasStationUrl =
    NETWORK === 'mainnet'
      ? 'https://gasstation-mainnet.matic.network/v2'
      : 'https://gasstation-mumbai.matic.today/v2';

  const provider = new ethers.providers.JsonRpcProvider(INFURA_RPC_URL);

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const { data } = await axios.get(gasStationUrl, { httpsAgent });

  const maxFeePerGas = ethers.utils.parseUnits(
    Math.ceil(data.fast.maxFee * 1.1).toString(),
    'gwei',
  );
  const maxPriorityFeePerGas = ethers.utils.parseUnits(
    Math.ceil(data.fast.maxPriorityFee * 1.1).toString(),
    'gwei',
  );

  const privateKey = HOT_WALLET_PRIVATE_KEY;
  const signer = new ethers.Wallet(privateKey, provider);

  const address = MINT_CONTRACT_ADDRESS;

  const timeCapsuleNftContract = new ethers.Contract(address, abi, signer);

  return timeCapsuleNftContract.mint(polygonAddress, uniqueId, {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
}

export default handleMint;
