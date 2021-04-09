pragma solidity ^0.5.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
//import '@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721Full.sol';
//(The Token must be Burnable because the Ant can die).

import "./AntEggToken.sol";
import "hardhat/console.sol";

contract CryptoAnt is ERC721, ERC721Full {
  //+-We set the Ant Egg Token as a Variable to be able to receive it in exchange for giving an Ant:_
  AntEggToken public antEggToken;

  //+-We set the Ant Egg Token in the Constructor to be able to receive it in exchange for giving an Ant:_
  constructor(AntEggToken _antEggToken) ERC721Full("CryptoAnt", "ANT") public {

    antEggToken = _antEggToken;
  }

  //+-Create Ant Function:_
  function createAnt(/**string memory _tokenURI*/) public payable returns(bool) {
    //+-Transfer 1 AntEggToken to this contract for creating an Ant, and we mark it as a MUST(require(***);):_
    antEggToken.transferFrom(msg.sender, address(this)/**+-"this" makes reference to the Smart Contract Address.*/, 1);
    require(antEggToken.transferFrom(msg.sender, address(this)/**+-"this" makes reference to the Smart Contract Address.*/, 1));
    //require(msg.value == 1 antEggToken, "You must deposit one AntEggToken in order to get an Ant.");

    //+-We give the Ant an ID to be able to identify it later:_
    uint _tokenId = totalSupply().add(1);
    //+-The NFT is Minted and sended to the User:_
    _mint(msg.sender, _tokenId);
    //_setTokenURI(_tokenId, _tokenURI);
    //(This is in case we have to associate an Image or something to the NFT in the future, but for now it is not the case).
    return true;
  }
}

//+-To compile the contract run npx hardhat compile in your terminal. The compile task is one of the built-in Hardhat tasks.