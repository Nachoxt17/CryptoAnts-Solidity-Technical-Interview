pragma solidity ^0.5.0;

import './AntEggToken.sol';

contract AntEggShop is AntEggToken {
  string public name = "Ant Eggs Shop";
  address public owner;

  function sellAntEgg(address _to, uint _numberOfEggs) public payable {
    
  }
}