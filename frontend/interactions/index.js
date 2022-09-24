import { ethers } from "ethers";
import { COUNContractAddress, StakingCOUNContractAddress, AwardNFTContractAddress, _stakingCoun, awardNFT, coun} from "../constants/ethConstants"; 

export async function stake(provider){
    let amount = 10000000000000000000; // 10 COUN in Wei
    let time = 1209600; // 14 days in Seconds
    
    // Do all the checks here (if the user has already staked etc.)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();

    await COUNContractAddress.approve(StakingCOUNContractAddress, amount); // Approve for transferFrom function in StakingContract
    const stakingContract = new ethers.Contract(StakingCOUNContractAddress, _stakingCoun, signer);
    stakingContract.stake(amount);
  }