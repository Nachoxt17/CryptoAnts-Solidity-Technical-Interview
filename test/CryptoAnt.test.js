const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CryptoAnt Smart-Contract", function () {
  let CryptoAntContract;
  let CryptoAnt;
  let _owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    //+-Get the ContractFactory and Signers here:_
    CryptoAntContract = await ethers.getContractFactory("CryptoAnt");
    AntEggTokenContract = await ethers.getContractFactory("AntEggToken");
    [_owner, addr1, addr2] = await ethers.getSigners();

    AntEggToken = await AntEggTokenContract.deploy();
    CryptoAnt = await CryptoAntContract.deploy(AntEggToken.address);
  });

  describe("Deployment", async function () {
    it("Should set the right owner", async function () {
      expect(await CryptoAnt.owner()).to.equal(_owner.address);
    });

    it("Deployment should show that the Initial totalSupply of Tokens is 0", async function () {
      expect((await CryptoAnt.totalSupply()) === 0);
    });
  });
});
//+-On your terminal run "npx hardhat test".
