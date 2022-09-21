import { ethers } from "ethers";
import { COUNContractAddress, StakingCOUNContractAddress, AwardNFTContractAddress, _stakingCoun, awardNFT, coun} from "../constants/ethConstants"; 

export async function stake(provider){ // need to import provider here
    // Do all the checks here (if the user has already staked etc.)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const stakingContract = new ethers.Contract(StakingCOUNContractAddress, _stakingCoun, signer);
  
    const req = await stakingContract.totalSupply()
    console.log(req, userAddress)

    // All of these are used for payable smart contract
    /*const tx = await stakingContract.setRewardsDuration({ gasPrice: 20e9 }); 
    console.log(`Transaction hash: ${tx.hash}`);
  
    const receipt = await tx.wait();
    console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
    console.log(`Gas used: ${receipt.gasUsed.toString()}`);*/
  }