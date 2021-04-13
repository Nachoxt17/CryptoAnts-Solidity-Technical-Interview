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
    AntEggTokenContract = await ethers.getContractFactory("AntEggToken");
    [_owner, addr1, addr2] = await ethers.getSigners();

    AntEggToken = await AntEggTokenContract.deploy();
  });

  describe("Deployment", function () {
    /**+-Although the "Deployment" Test passes successfully, in the Console it will throw a Warning saying that the Structure of using an Async Function without a
     ".catch ()" block inside is out of date for Node, with the Following Message:_
     
     Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch().
      To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode).
      (rejection id: 2)

      +-And that an Argument is missing within the Code of the node_module @ethersproject:_

      UnhandledPromiseRejectionWarning: Error: missing argument:  in Contract constructor (count=0, expectedCount=1, code=MISSING_ARGUMENT, version=contracts/5.1.0)
      at Logger.makeError (C:\...\Crypto-Ants\node_modules\@ethersproject\logger\src.ts\index.ts:205:28)
      (It also continues logging a lot of other bugs inside "\node_modules\@ethersproject\...")
    .*/

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
      await AntEggToken.connect(addr1.address).BuyAntEggs(400, { value: 4 });
      //(For reasons I don't know the console throws a "BigNumber" bug when when placing a number with decimals inside "{ value: *here* }").
      const addr1Balance = await AntEggToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(400);
    });

    //+-THIS has this Bug:_ Error: VoidSigner cannot sign transactions (operation="signTransaction", code=UNSUPPORTED_OPERATION, version=abstract-signer/5.1.0)
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
