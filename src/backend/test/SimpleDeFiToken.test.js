const { expect } = require("chai");
const { ethers } = require("hardhat");
const { toWei, fromWei } = require("./Utils");

describe("SimpleDeFiToken", () => {
    let deployer, addr1, addr2, token;
    const TOTAL_SUPPLY = 1000000;

    beforeEach(async () => {
      [deployer, addr1, addr2] = await ethers.getSigners();
      const tokenContractFactory = await ethers.getContractFactory("SimpleDeFiToken");
      token = await tokenContractFactory.deploy();
    });

    it("has symbol SDFT", async ()=>{
        const symbole = await token.symbol();
        expect(symbole).equals("SDFT");
    });

    it("has name Simple DeFi Token", async ()=>{
      const symbole = await token.name();
      expect(symbole).equals("Simple DeFi Token");
    });

    it("has total supply 1,000,000 SDFT", async() => {
      const totalSupply = parseInt(fromWei(await token.totalSupply()));
      expect(totalSupply).equals(TOTAL_SUPPLY);
    });

    it("Should transfer token from one to another", async() => {
      const deployerBalanceBefor = parseInt(fromWei(await token.balanceOf(deployer.address)));
      expect(deployerBalanceBefor).equals(TOTAL_SUPPLY);

      await token.connect(deployer).transfer(addr1.address, toWei(5));

      const deployerBalanceAfter = parseInt(fromWei(await token.balanceOf(deployer.address)));
      expect(deployerBalanceAfter).equals(TOTAL_SUPPLY - 5);

      const addr1Balance = parseInt(fromWei(await token.balanceOf(addr1.address)))
      expect(addr1Balance).equals(5);
    });

    it("revert when tranfer amount exceed the balance", async() => {
      // note that addr1 initial token's balance is zero
      await expect(token.connect(addr1).transfer(addr2.address, toWei(10))).to.be.
      revertedWithCustomError(token, "ERC20InsufficientBalance");
    })

    it("Should burn token automatically when calling transferWithAutoBurn", async () => {
        await token.connect(deployer).transfer(addr1.address, toWei(1));
        await token.connect(addr1).transferWithAutoBurn(addr2.address,toWei(1));
    })
});