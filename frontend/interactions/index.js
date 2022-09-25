import { ethers } from "ethers";
import { COUNContractAddress, StakingCOUNContractAddress, AwardNFTContractAddress, _stakingCoun, _awardNFT, _coun} from "../constants/ethConstants"; 
import image from "../pages/api/ipfs";

export async function start(challenge){
  // start timer
}

export async function stop(challenge){
  // stop timer
  const sleep_time = 8; // In hours
  // check if limit is met
  // If not ...
}

export async function stake(){
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    let amount = ethers.utils.parseEther('10'); // 10 COUN in Wei
    let time = 1209600; // 14 days in Seconds
    
    // Do all the checks here (if the user has already staked etc.) 
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    var options = { gasPrice: 1000000000, gasLimit: 3000000, nonce: 45, value: 0 };
    const counContract = new ethers.Contract(COUNContractAddress, _coun, signer);
    await counContract.approve(StakingCOUNContractAddress, amount, options); // Approve for transferFrom function in StakingContract

    const stakingContract = new ethers.Contract(StakingCOUNContractAddress, _stakingCoun, signer);
    const res = await stakingContract.stake(amount, options);
    console.log(res.hash) // for test
    return res.hash;
  } catch(err) {
    console.log(err);
    return err;
  }
}

export async function getReward() {
  try {
    // Check here if the user has completed the challenge

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    var options = { gasPrice: 1000000000, gasLimit: 3000000, nonce: 45, value: 0 };

    const stakingContract = new ethers.Contract(StakingCOUNContractAddress, _stakingCoun, signer);
    const res = await stakingContract.getReward(options);
    
    let userAddress = await signer.getAddress();
    const uri = await image(userAddress);

    const awardContract = new ethers.Contract(AwardNFTContractAddress, _awardNFT, signer);
    const res2 = await awardContract.safeMint(userAddress, uri, options);

    return (res.hash, res2.hash);
  } catch(err) {
    console.log(err);
    return err;
  }
}

export async function timeIntoChallenge() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const stakingContract = new ethers.Contract(StakingCOUNContractAddress, _stakingCoun, signer);
    const finish = await stakingContract.finishAt();
    const updated = await stakingContract.updatedAt();
    const time = finish-updated; 

    return time; // In seconds
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function earnedTokens() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const stakingContract = new ethers.Contract(StakingCOUNContractAddress, _stakingCoun, signer);
    const earned = await stakingContract.earned(userAddress);
    return ethers.utils.formatEther(earned); // In COUNs
  } catch(err) {
    console.log(err);
    return err;
  }
}