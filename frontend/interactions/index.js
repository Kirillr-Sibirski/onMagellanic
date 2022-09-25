import { ethers } from "ethers";
import { COUNContractAddress, GreatSleepRegulatorContractAddress, OldAgainstNewContractAddress, StableBedFrequencyContractAddress, TalkToSubsciousnessContractAddress, TraditionalPracticeNewHorizonContractAddress, AwardNFTContractAddress, _GreatSleepRegulator, _OldAgainstNew, _StableBedFrequency, _TalkToSubsciousness, _TraditionalPracticeNewHorizon, _awardNFT, _coun} from "../constants/ethConstants"; 
import image from "../pages/api/ipfs";

export async function start(challenge){
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let name;
    let abi;
    switch (challenge) {
      case 0: 
        name = GreatSleepRegulatorContractAddress
        abi = _GreatSleepRegulator
      case 1:
        name = OldAgainstNewContractAddress
        abi = _OldAgainstNew
      case 2:
        name = StableBedFrequencyContractAddress
        abi = _StableBedFrequency
      case 3:
        name = TalkToSubsciousnessContractAddress
        abi = _TalkToSubsciousness
      case 4:
        name = TraditionalPracticeNewHorizonContractAddress
        abi = _TraditionalPracticeNewHorizon
    }
    const contract = new ethers.Contract(name, abi, signer);
    const req = await contract.startDaily();
    console.log(req)
  } catch(err) {
    console.log(err)
  }
}

export async function stop(challenge){
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let name;
    let abi;
    switch (challenge) {
      case 0: 
        name = GreatSleepRegulatorContractAddress
        abi = _GreatSleepRegulator
      case 1:
        name = OldAgainstNewContractAddress
        abi = _OldAgainstNew
      case 2:
        name = StableBedFrequencyContractAddress
        abi = _StableBedFrequency
      case 3:
        name = TalkToSubsciousnessContractAddress
        abi = _TalkToSubsciousness
      case 4:
        name = TraditionalPracticeNewHorizonContractAddress
        abi = _TraditionalPracticeNewHorizon
    }
    const contract = new ethers.Contract(name, abi, signer);
    const req = await contract.stopDaily();
    console.log(req)
  } catch(err) {
    console.log(err)
  }
}

export async function stake(challenge){ // int
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    let amount = ethers.utils.parseEther('10'); // 10 COUN in Wei
    
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    var options = { gasPrice: 1000000000, gasLimit: 3000000, nonce: 45, value: 0 };
    const counContract = new ethers.Contract(COUNContractAddress, _coun, signer);
    let name;
    let abi;
    switch (challenge) {
      case 0: 
        name = GreatSleepRegulatorContractAddress
        abi = _GreatSleepRegulator
      case 1:
        name = OldAgainstNewContractAddress
        abi = _OldAgainstNew
      case 2:
        name = StableBedFrequencyContractAddress
        abi = _StableBedFrequency
      case 3:
        name = TalkToSubsciousnessContractAddress
        abi = _TalkToSubsciousness
      case 4:
        name = TraditionalPracticeNewHorizonContractAddress
        abi = _TraditionalPracticeNewHorizon
    }
    await counContract.approve(name, amount, options); // Approve for transferFrom function in StakingContract

    const stakingContract = new ethers.Contract(name, abi, signer);
    const res = await stakingContract.stake(amount, options);
    console.log(res.hash) // for test
    return res.hash;
  } catch(err) {
    console.log(err);
    return err;
  }
}

export async function getReward(challenge) { // int
  try {
    let name;
    let abi;
    switch (challenge) {
      case 0: 
        name = "GreatSleepRegulator"
        abi = _GreatSleepRegulator
      case 1:
        name = "OldAgainstNew"
        abi = _OldAgainstNew
      case 2:
        name = "StableBedFrequency"
        abi = _StableBedFrequency
      case 3:
        name = "TalkToSubsciousness"
        abi = _TalkToSubsciousness
      case 4:
        name = "TraditionalPracticeNewHorizon"
        abi = _TraditionalPracticeNewHorizon
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    var options = { gasPrice: 1000000000, gasLimit: 3000000, nonce: 45, value: 0 };

    const stakingContract = new ethers.Contract(name, _stakingCoun, signer);
    const res = await stakingContract.getReward(options);
    
    let userAddress = await signer.getAddress();
    const uri = await image(userAddress, challenge);

    const awardContract = new ethers.Contract(AwardNFTContractAddress, _awardNFT, signer);
    const res2 = await awardContract.safeMint(userAddress, uri, options);

    return (res.hash, res2.hash);
  } catch(err) {
    console.log(err);
    return err;
  }
}

export async function timeIntoChallenge(challenge) {
  try {
    let name;
    let abi;
    switch (challenge) {
      case 0: 
        name = "GreatSleepRegulator"
        abi = _GreatSleepRegulator
      case 1:
        name = "OldAgainstNew"
        abi = _OldAgainstNew
      case 2:
        name = "StableBedFrequency"
        abi = _StableBedFrequency
      case 3:
        name = "TalkToSubsciousness"
        abi = _TalkToSubsciousness
      case 4:
        name = "TraditionalPracticeNewHorizon"
        abi = _TraditionalPracticeNewHorizon
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const stakingContract = new ethers.Contract(name, abi, signer);
    const finish = await stakingContract.finishAt();
    const updated = await stakingContract.updatedAt();
    const time = finish-updated; 

    return time; // In seconds
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function earnedTokens(challenge) {
  try {
    let name;
    let abi;
    switch (challenge) {
      case 0: 
        name = "GreatSleepRegulator"
        abi = _GreatSleepRegulator
      case 1:
        name = "OldAgainstNew"
        abi = _OldAgainstNew
      case 2:
        name = "StableBedFrequency"
        abi = _StableBedFrequency
      case 3:
        name = "TalkToSubsciousness"
        abi = _TalkToSubsciousness
      case 4:
        name = "TraditionalPracticeNewHorizon"
        abi = _TraditionalPracticeNewHorizon
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const stakingContract = new ethers.Contract(name, abi, signer);
    const earned = await stakingContract.earned(userAddress);
    return ethers.utils.formatEther(earned); // In COUNs
  } catch(err) {
    console.log(err);
    return err;
  }
}