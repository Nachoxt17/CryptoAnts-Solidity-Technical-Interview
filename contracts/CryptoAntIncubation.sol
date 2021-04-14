pragma solidity ^0.5.5;

import "./CryptoAnt.sol";
import "./AntEggToken.sol";

import "hardhat/console.sol";

contract CryptoAntIncubation is CryptoAnt, AntEggToken {
    //+-Random Number used only Once(Used to Generate more complex Random Numbers):_
    uint256 randNumOnce = 0;
    //+-Incubation time between creation of new Eggs:_
    uint256 incubationTime = 10 minutes;

    /**+-Here we will use this Function to determine the Nº of Eggs a CryptoAnt can produce Every 10 Minutes and the % of probabilities it has of dying
  when creating Eggs:_*/
    function generateRandNum(uint256 _num) internal returns (uint256) {
        randNumOnce++;
        return
            uint256(keccak256(abi.encodePacked(now, msg.sender, randNumOnce))) %
            _num;
    }

    /**+-The CryptoAnt ID, Number of Eggs that can Produce every 10 minutes and % of Chances of Dying while creating Eggs could be 
  included in a Structure that is used to Create new CryptoAnts NFTs.*/

    function _incubateAnEgg(
        uint256 _antId,
        uint256 _numOfEggs,
        uint256 _chancesOfDying
    ) internal {
        uint256 randomLuckFactor;
        /**+-In this function the CryptoAnt should create the Number of AntEggTokens which is randomly determined to create, and then DIE or NOT according to a 
    randomLuckFactor; If the CryptoAnt lives, it can repeat the process within 10 minutes; and if the CryptoAnt dies, the CryptoAnt N.F.T is burned.*/
        /*if(randomLuckFactor) {
      //+-CryptoAnt lives and can repeat the process within 10 minutes.
      return true;
    } else {
      //+-CryptoAnt N.F.T is burned.
      return false;
    }*/
  }
}

//+-To compile the contract run npx hardhat compile in your terminal.
