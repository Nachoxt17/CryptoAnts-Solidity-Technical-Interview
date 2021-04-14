pragma solidity ^0.5.5;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
//import '@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721Full.sol';
//(The Token must be Burnable because the Ant can die).

import "./AntEggToken.sol";
import "hardhat/console.sol";

contract CryptoAnt is ERC721, ERC721Full {
  //+-We set the Ant Egg Token as a Variable to be able to receive it in exchange for giving an Ant:_
  AntEggToken public antEggToken;

  address private _owner;

  //+-We set the Ant Egg Token in the Constructor to be able to receive it in exchange for giving an Ant:_
  constructor(AntEggToken _antEggToken) ERC721Full("CryptoAnt", "ANT") public {

    antEggToken = _antEggToken;
    _owner = msg.sender;
  }

  //+-Returns the Address of the CryptoAnts Game Owner:_
    function owner() public view returns(address) {
      return _owner;
    }

  //+-Create Ant Function:_
  function createAnt(string memory _tokenURI) public payable returns(bool) {
    //+-Transfer 1 AntEggToken to this contract for creating an Ant, and we mark it as a MUST(require(***);):_
    antEggToken.transferFrom(msg.sender, address(this)/**+-"this" makes reference to the Smart Contract Address.*/, 1);
    require(antEggToken.transferFrom(msg.sender, address(this)/**+-"this" makes reference to the Smart Contract Address.*/, 1));

    //+-We give the Ant an ID to be able to identify it later:_
    uint _tokenId = totalSupply().add(1);
    //+-The NFT is Minted and sended to the User:_
    _mint(msg.sender, _tokenId);
    //+-The TokenURI is a key-->value Data to be associated with the TokenID in case we have to associate an Image, I.P.F.S address, etc to the N.F.T in the future:_
    _setTokenURI(_tokenId, _tokenURI);
    return true;
  }
}

//+-To compile the contract run npx hardhat compile in your terminal.