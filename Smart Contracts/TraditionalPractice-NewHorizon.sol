// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./COUN.sol";
contract TraditionalPractice-NewHorizon {
    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardsToken;

    address public owner;

    // Duration of rewards to be paid out (in seconds)
    uint public duration;
    // Timestamp of when the rewards finish
    uint public finishAt;
    // Minimum of last updated time and reward finish time
    uint public updatedAt;
    // Reward to be paid out per second
    uint public rewardRate;
    // Sum of (reward rate * dt * 1e18 / total supply)
    uint public rewardPerTokenStored;
    // Duration of task user has to complete daily (part of a challenge)
    uint public dailyDuration;
    // Time user has started daily challenge at
    uint public dailyStart;
    // Time user has stopped daily challenge at
    uint public dailyStop;
    // Duration one day in seconds
    uint public oneDay = 82800; // By default set to 23h. 
    // User address => rewardPerTokenStored
    mapping(address => uint) public userRewardPerTokenPaid;
    // User address => rewards to be claimed
    mapping(address => uint) public rewards;

    // Total staked
    uint public totalSupply;
    // User address => staked amount
    mapping(address => uint) public balanceOf;

    constructor(address _stakingToken, address _rewardToken) {
        owner = msg.sender;
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardToken);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not authorized");
        _;
    }

    modifier updateReward(address _account) {
        rewardPerTokenStored = rewardPerToken();
        updatedAt = lastTimeRewardApplicable();

        if (_account != address(0)) {
            rewards[_account] = earned(_account);
            userRewardPerTokenPaid[_account] = rewardPerTokenStored;
        }

        _;
    }

    function lastTimeRewardApplicable() public view returns (uint) {
        return _min(finishAt, block.timestamp);
    }

    function rewardPerToken() public view returns (uint) {
        if (totalSupply == 0) {
            return rewardPerTokenStored;
        }

        return
            rewardPerTokenStored +
            (rewardRate * (lastTimeRewardApplicable() - updatedAt) * 1e18) /
            totalSupply;
    }

    function stake(uint _amount) external updateReward(msg.sender) {
        require(_amount > 0, "amount = 0");
        stakingToken.transferFrom(address(msg.sender), address(this), _amount);
        balanceOf[msg.sender] += _amount;
        totalSupply += _amount;
    }

    function earned(address _account) public view returns (uint) {
        return
            ((balanceOf[_account] *
                (rewardPerToken() - userRewardPerTokenPaid[_account])) / 1e18) +
            rewards[_account];
    }

    function getReward() external updateReward(msg.sender) {
        require(finishAt < block.timestamp, "reward duration not finished");
        uint reward = rewards[msg.sender];
        uint amount = balanceOf[msg.sender];
        require(reward > 0 && amount > 0, "no tokens staked or nothing earned");
        rewards[msg.sender] = 0;
        balanceOf[msg.sender] = 0;
        totalSupply -= amount;
        rewardsToken.transfer(msg.sender, reward+amount);
    }

    function setRewardsDuration(uint _duration) external onlyOwner {
        require(finishAt < block.timestamp, "reward duration not finished");
        duration = _duration;
    }

    function setDailyChallengeDuration(uint _dailyDuration) external onlyOwner {
        require(finishAt < block.timestamp, "reward duration not finished");
        dailyDuration = _dailyDuration;
    }

    function notifyRewardAmount(uint _amount)
        external
        onlyOwner
        updateReward(address(0))
    {
        if (block.timestamp >= finishAt) {
            rewardRate = _amount / duration;
        } else {
            uint remainingRewards = (finishAt - block.timestamp) * rewardRate;
            rewardRate = (_amount + remainingRewards) / duration;
        }

        //require(rewardRate > 0, "reward rate = 0");
        require(
            rewardRate * duration <= rewardsToken.balanceOf(address(this)),
            "reward amount > balance"
        );

        finishAt = block.timestamp + duration;
        updatedAt = block.timestamp;
    }

    function _min(uint x, uint y) private pure returns (uint) {
        return x <= y ? x : y;
    }

    function changeDay(uint _seconds) external onlyOwner {
        oneDay = _seconds;
    }

    function startDaily() external {
        uint amount = balanceOf[msg.sender];
        require(amount > 0, "no tokens staked");
        require(dailyStart <= block.timestamp, "start daily is ahead of current time");
        require(dailyStop < block.timestamp-oneDay, "last challenge was less than sometime ago"); // 23h. by default doesn't work
        dailyStart = block.timestamp;
    } 

    function stopDaily() external {
        uint amount = balanceOf[msg.sender];
        require(amount > 0, "no tokens staked");
        if(dailyStart <= block.timestamp-dailyDuration) { // If challenge duration is less than expected
            // burn stake and rewards
            rewards[msg.sender] = 0;
            balanceOf[msg.sender] = 0;
        }
        dailyStop = block.timestamp;
    }
}