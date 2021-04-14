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

  describe("token distribution", async function () {
    let result;

    it("mints tokens", async function () {
      await CryptoAnt.mint(accounts[0], "https://www.token-uri.com/nft");

      //+-It should increase the total supply:_
      result = await CryptoAnt.totalSupply();
      assert.equal(result.toString(), "1", "total supply is correct");

      //+-It increments owner balance:_
      result = await CryptoAnt.balanceOf(accounts[0]);
      assert.equal(result.toString(), "1", "balanceOf is correct");

      //+-Token should belong to owner:_
      result = await CryptoAnt.ownerOf("1");
      assert.equal(
        result.toString(),
        accounts[0].toString(),
        "ownerOf is correct"
      );
      result = await CryptoAnt.tokenOfOwnerByIndex(accounts[0], 0);

      //+-Owner can see all tokens:_
      let balanceOf = await CryptoAnt.balanceOf(accounts[0]);
      let tokenIds = [];
      for (let i = 0; i < balanceOf; i++) {
        let id = await CryptoAnt.tokenOfOwnerByIndex(accounts[0], i);
        tokenIds.push(id.toString());
      }
      let expected = ["1"];
      assert.equal(
        tokenIds.toString(),
        expected.toString(),
        "tokenIds are correct"
      );

      //+-Token URI Correct:_
      let tokenURI = await CryptoAnt.tokenURI("1");
      assert.equal(tokenURI, "https://www.token-uri.com/nft");
    });
  });
});
//+-On your terminal run "npx hardhat test".
