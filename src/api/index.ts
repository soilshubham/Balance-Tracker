import { ethers } from "ethers";
import ERC20ABI from './abi.json';

const mainnet = process.env.TEST_NET;
const walletAddress = "0x4f0d6e68eebade804932c67fb2ee074a02379666";

// interface tokenType {
//     DAI: string,
//     USDT: string,
//     LINK: string,
// }

// const contractAddress: tokenType = {
//     DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
//     USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
//     LINK: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
// }

const provider = new ethers.providers.JsonRpcProvider(mainnet)

const getBalance = async (tokenName?: string) : Promise<string> => {
    try{

        const contract = new ethers.Contract("0xE68104D83e647b7c1C15a91a8D8aAD21a51B3B3E", ERC20ABI, provider);
        const balance = await contract.balanceOf(walletAddress);
        console.log(balance);
        return ethers.utils.formatEther(balance);
    }
    catch(error){
        console.log(error);
        return "012"
    }
}

export { getBalance };