import { ethers } from "ethers";
import ERC20ABI from './abi.json';
import TOKEN_ADDRESS from './token_address.json';
import { BalanceObject } from "../common/types";

// const testnet = process.env.REACT_APP_TESTNET_URL;
const testnet = "localhost:8545";

const provider = new ethers.providers.JsonRpcProvider(testnet)

// "0x4f0d6e68eebade804932c67fb2ee074a02379666"
// "0xdca5db89a1e06cde5b57ae56c6ba04d9db3a10dc"

const daiContract = new ethers.Contract(TOKEN_ADDRESS.DAI, ERC20ABI, provider);
const usdtContract = new ethers.Contract(TOKEN_ADDRESS.USDT, ERC20ABI, provider);
const linkContract = new ethers.Contract(TOKEN_ADDRESS.LINK, ERC20ABI, provider);

// interface BalanceReturnType {}

const getBalance = async (walletAddresses: string[]) : Promise<BalanceObject[] | undefined> => {
    try{
        
        const balances : BalanceObject[] = []; 
        console.log(walletAddresses);

        for(let i=0 ; i<walletAddresses.length ; i++){
            
            const daiBal = await daiContract.balanceOf(walletAddresses[i]);
            const usdtBal = await usdtContract.balanceOf(walletAddresses[i]);
            const linkBal = await linkContract.balanceOf(walletAddresses[i]);
    
            const balance : BalanceObject = {
                DAI: ethers.utils.formatEther(daiBal),
                USDT: ethers.utils.formatEther(usdtBal),
                LINK: ethers.utils.formatEther(linkBal),
            }

            balances.push(balance);
        }
        console.log(balances);
        return balances;
    }
    catch(error){
        console.log(error);
    }
}

export { getBalance };