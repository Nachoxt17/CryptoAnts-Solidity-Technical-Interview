//+-Made with this Tutorial:_ https://hardhat.org/tutorial/creating-a-new-hardhat-project.html .
pragma solidity ^0.5.0;
// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol';
import "hardhat/console.sol";

// This is the main building block for smart contracts.
contract AntEggToken is ERC20, ERC20Detailed, ERC20Mintable {

    uint256 public totalSupply = 1;

    constructor() ERC20Detailed("AntEggToken", "AET", 0) {
      balanceOf[msg.sender] = totalSupply;
    };
}

//+-To compile the contract run npx hardhat compile in your terminal. The compile task is one of the built-in tasks.