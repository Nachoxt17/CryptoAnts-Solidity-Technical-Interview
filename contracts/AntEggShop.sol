pragma solidity ^0.5.0;

import './AntEggToken.sol';

contract AntEggShop is AntEggToken {
  string public name = "Ant Eggs Shop";
  address public owner;

  constructor() public {
    owner = msg.sender;
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