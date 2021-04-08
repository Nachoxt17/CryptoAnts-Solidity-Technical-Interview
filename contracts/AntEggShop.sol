pragma solidity ^0.5.0;

import './AntEggToken.sol';

contract AntEggShop is AntEggToken {
  string public name = "Ant Eggs Shop";
  address public owner;

  constructor() public {
    owner = msg.sender;
  }

  function sellAntEgg(address _buyer, uint _numberOfEggs) public payable {
    //+-Check to make sure 0.01 ether was sent to the function call:
    require(msg.value == 0.01 ether * _numberOfEggs, "Incorrect amount of ETH, you must pay 0.01 ETH per AntEggToken.");
    
  }
}