pragma solidity ^0.5.5;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol';
import "hardhat/console.sol";

// This is the main building block for smart contracts.
contract AntEggToken is ERC20, ERC20Detailed, ERC20Mintable {

    address payable public _owner;

    //+-We use a Variable for the price of the Token so we can change it if we want:_
    uint256 tokenPrice = 0.01 ether;
    
    constructor() ERC20Detailed("AntEggToken", "AET", 0) public {
      /**+-_totalSupply is Already Initialized to zero, so we don't touch it.*/
      _owner = msg.sender;
    }

    //+-Returns the Address of the CryptoAnts Game Owner:_
    function owner() public view returns(address) {
      return _owner;
    }
    
    //+-Tell if an Address is the CryptoAnts Game Owner or not:_
    function isOwner() public view returns(bool) {
      return msg.sender == _owner;
    }

    //+-Modifier that allows a Function to be called ONLY by the CryptoAnts Game Owner:_
    modifier onlyOwner() {
      require(isOwner());
      _;
    }

    //+-To Withdrawal all the Ether we collect from the Tokens sold:_
    function withdrawMoney() external onlyOwner {
      _owner.transfer(address(this).balance);
    }

    //+-Change the Price of the Ant Egg Token:_
    function setAntEggPrice(uint256 _price) external onlyOwner {
      tokenPrice = _price;
    }

    function BuyAntEggs(uint256 _numberOfEggs) public payable {
    //+-Check to make sure 0.01 ether/tokenPrice per NumberOfEggs bought was sent to the Function call:_
    require(msg.value == tokenPrice * _numberOfEggs, "Incorrect amount of ETH, you must pay 0.01/tokenPrice ETH per AntEggToken.");

    //+-The Buyer Mints the AntEggs that bought and receive them in her/his Account/Wallet with the _mint(***) internal Function:_
    _mint(msg.sender, _numberOfEggs);
  }
}

//+-To compile the contract run npx hardhat compile in your terminal.