const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ant Egg Token Smart-Contract", function () {
  let AntEggTokenContract;
  let AntEggToken;
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

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await AntEggToken.owner()).to.equal(_owner.address);
    });

    it("Deployment should show that the Initial totalSupply of Tokens is 0", async function () {
      expect((await AntEggToken.totalSupply()) === 0);
    });
  });

  describe("Selling Tokens", function () {
    it("Should give the User the Tokens that bought with the Exact Ammount of Ether needed", async function () {
      //+-Transfer 35 Tokens that addr1 bought from _owner to addr1:_
      await AntEggToken.connect(addr1).BuyAntEggs(35, {
        value: ethers.utils.parseEther("0.01").mul(35),
      });
      const addr1Balance = await AntEggToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(35);
    });
  });

  describe("Transactions", function () {
    it("Should transfer Tokens between accounts", async function () {
      //+-Transfer 50 tokens from owner to addr1:_
      AntEggToken.mint(_owner.address, 50);
      await AntEggToken.transfer(addr1.address, 50);
      const addr1Balance = await AntEggToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      //+-Transfer 50 tokens from addr1 to addr2:_
      await AntEggToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await AntEggToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      AntEggToken.mint(_owner.address, 100);
      const initialOwnerBalance = await AntEggToken.balanceOf(_owner.address);

      //+-Try to send 1 token from addr1 (0 tokens) to owner (100 tokens):_
      await expect(
        AntEggToken.connect(addr1).transfer(_owner.address, 1)
      ).to.be.revertedWith("transfer amount exceeds balance");

      //+-Owner balance shouldn't have changed:_
      expect(await AntEggToken.balanceOf(_owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      AntEggToken.mint(_owner.address, 200);
      const initialOwnerBalance = await AntEggToken.balanceOf(_owner.address);

      //+-Transfer 100 tokens from owner to addr1:_
      await AntEggToken.transfer(addr1.address, 100);

      //+-Transfer another 50 tokens from owner to addr2:_
      await AntEggToken.transfer(addr2.address, 50);

      //+-Check balances:_
      const finalOwnerBalance = await AntEggToken.balanceOf(_owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);

      const addr1Balance = await AntEggToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await AntEggToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});
//+-On your terminal run "npx hardhat test".
