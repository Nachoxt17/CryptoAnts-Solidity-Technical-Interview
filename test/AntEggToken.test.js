const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ant Egg Token Smart-Contract", function () {
  it("Deployment should show that the Initial totalSupply of Tokens is 0.", async function () {
    const [owner] = await ethers.getSigners();

    const AntEggTokenContract = await ethers.getContractFactory("AntEggToken");
    /**+-A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts, so Token here is a factory for instances(versions)
     of our token contract.*/

    const AntEggToken = await AntEggTokenContract.deploy();

    expect((await AntEggToken.totalSupply()) === 0);
  });
});
//+-On your terminal run "npx hardhat test".
