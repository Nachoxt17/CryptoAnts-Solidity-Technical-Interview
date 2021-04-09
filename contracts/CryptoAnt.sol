pragma solidity ^0.5.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
//import '@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721Full.sol';
//(The Token must be Burnable because the Ant can die).

import "./AntEggToken.sol";
import "hardhat/console.sol";

contract CryptoAnt is ER721, ERC721Full {
  AntEggToken public antEggToken;

  constructor(AntEggToken _antEggToken) ERC721Full("CryptoAnt", "ANT") public {
    antEggToken = _antEggToken;
  }

  function createAnt(/**string memory _tokenURI*/) public payable returns(bool) {
    //+-Transfer Mock Dai Tokens to this contract for staking:_
    require(antEggToken.transferFrom(msg.sender, address(this)/**+-"this" makes reference to the Smart Contract Address.*/, 1));

    uint _tokenId = totalSupply().add(1);
    _mint(msg.sender, _tokenId);
    /**_setTokenURI(_tokenId, _tokenURI);*/
    return true;
  }
}

//+-To compile the contract run npx hardhat compile in your terminal. The compile task is one of the built-in Hardhat tasks.