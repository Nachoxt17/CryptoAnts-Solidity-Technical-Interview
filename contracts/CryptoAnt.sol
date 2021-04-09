pragma solidity ^0.5.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721Metadata.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol';
//(The Token must be Burnable because the Ant can die).
import "hardhat/console.sol";

contract CryptoAnt is ER721, ERC721Metadata, ERC721Mintable, ERC721Burnable {

    uint256 public totalSupply = 0;

    constructor() ERC721Metadata("CryptoAnt", "ANT") public {
    };
}

//+-To compile the contract run npx hardhat compile in your terminal. The compile task is one of the built-in tasks.