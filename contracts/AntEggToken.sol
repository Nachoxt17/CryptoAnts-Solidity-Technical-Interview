pragma solidity ^0.5.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol';
import "hardhat/console.sol";

// This is the main building block for smart contracts.
contract AntEggToken is ERC20, ERC20Detailed, ERC20Mintable {

    uint256 public totalSupply = 0;

    constructor() ERC20Detailed("AntEggToken", "AET", 0) public {
      
    }

    function BuyAntEggs(uint _numberOfEggs) public payable {
    //+-Check to make sure 0.01 ether per NumberOfEggs bought was sent to the Function call:_
    require(msg.value == 0.01 ether * _numberOfEggs, "Incorrect amount of ETH, you must pay 0.01 ETH per AntEggToken.");
    
    //+-(1)-Give the Buyer(The msg.sender that called the Function) a Temporary Permit to Mint the AntEggs that bought:_
    _addMinter(msg.sender);
    //+-(2)-The Buyer Mints the AntEggs that bought and receive them in her/his Account/Wallet:_
    mint(msg.sender, _numberOfEggs);
    //+-(3)-Now that the Buyer minted and received the AntEggTokens that bought, he/she losses the Temporary Permit to Mint AntEggs:_
    _removeMinter(msg.sender);
    /**+-This is done this way because otherwise it would be complicated to call the Contract Owner to Mint new AntEggTokens from a Function that
    is called which is called externally by buyers.*/
  }
}

//+-To compile the contract run npx hardhat compile in your terminal. The compile task is one of the built-in Hardhat tasks.