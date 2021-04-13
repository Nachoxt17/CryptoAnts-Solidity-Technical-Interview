const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CryptoAnt Smart-Contract", function () {
  let CryptoAntContract;
  let CryptoAnt;
  let _owner;
  let addr1;
  let addr2;

  /**beforeEach(async function () {
    //+-Get the ContractFactory and Signers here:_
    CryptoAntContract = await ethers.getContractFactory("CryptoAnt");
    [_owner, addr1, addr2] = await ethers.getSigners();

    CryptoAnt = await CryptoAntContract.deploy();
  });
  +-This function up here of should be used instead of repeating the code at the beginning of each Test Function, but when using "beforeEach(***)" or "before(***)" with
  the Testing of this N.F.T, the following bug appears:_

   "before each" hook for "Should set the right owner":
     Error: missing argument:  in Contract constructor (count=0, expectedCount=1, code=MISSING_ARGUMENT, version=contracts/5.1.0).
  
  .*/

  describe("Deployment", async function () {
    CryptoAntContract = await ethers.getContractFactory("CryptoAnt");
    [_owner, addr1, addr2] = await ethers.getSigners();
    CryptoAnt = await CryptoAntContract.deploy();
    //+-This Code Up Here is repeated Code.

    it("Should set the right owner", async function () {
      expect(await CryptoAnt.owner()).to.equal(_owner.address);
    });

    it("Deployment should show that the Initial totalSupply of Tokens is 0", async function () {
      expect((await CryptoAnt.totalSupply()) === 0);
    });
  });

  describe("Transactions", async function () {
    CryptoAntContract = await ethers.getContractFactory("CryptoAnt");
    [_owner, addr1, addr2] = await ethers.getSigners();
    CryptoAnt = await CryptoAntContract.deploy();
    //+-This Code Up Here is repeated Code.

    it("Should transfer Tokens between accounts", async function () {
      //+-Transfer 50 tokens from owner to addr1:_
      CryptoAnt.mint(_owner.address, 50);
      await CryptoAnt.transfer(addr1.address, 50);
      const addr1Balance = await CryptoAnt.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      //+-Transfer 50 tokens from addr1 to addr2:_
      await CryptoAnt.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await CryptoAnt.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      CryptoAnt.mint(_owner.address, 100);
      const initialOwnerBalance = await CryptoAnt.balanceOf(_owner.address);

      //+-Try to send 1 token from addr1 (0 tokens) to owner (100 tokens):_
      await expect(
        CryptoAnt.connect(addr1).transfer(_owner.address, 1)
      ).to.be.revertedWith("transfer amount exceeds balance");

      //+-Owner balance shouldn't have changed:_
      expect(await CryptoAnt.balanceOf(_owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      CryptoAnt.mint(_owner.address, 200);
      const initialOwnerBalance = await CryptoAnt.balanceOf(_owner.address);

      //+-Transfer 100 tokens from owner to addr1:_
      await CryptoAnt.transfer(addr1.address, 100);

      //+-Transfer another 50 tokens from owner to addr2:_
      await CryptoAnt.transfer(addr2.address, 50);

      //+-Check balances:_
      const finalOwnerBalance = await CryptoAnt.balanceOf(_owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);

      const addr1Balance = await CryptoAnt.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await CryptoAnt.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});
//+-On your terminal run "npx hardhat test".
