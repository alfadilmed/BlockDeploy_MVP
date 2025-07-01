import { ethers, network } from "hardhat";
import { expect } from "chai";
import { SimpleLaunchpad, MinimalERC20 } from "../typechain-types"; // Adapter les imports TypeChain
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { time } from "@nomicfoundation/hardhat-network-helpers"; // Pour manipuler le temps

describe("SimpleLaunchpad Contract", function () {
  let launchpad: SimpleLaunchpad;
  let saleToken: MinimalERC20; // Utiliser MinimalERC20 comme mock
  let owner: HardhatEthersSigner;
  let buyer1: HardhatEthersSigner;
  let buyer2: HardhatEthersSigner;
  let otherUser: HardhatEthersSigner;

  const tokenName = "Sale Token";
  const tokenSymbol = "SLT";
  const tokenInitialSupply = ethers.parseUnits("1000000", 18); // 1 million de SLT avec 18 décimales

  const pricePerTokenInWei = ethers.parseEther("0.001"); // 1 SLT = 0.001 ETH
  const amountToSellInLaunchpad = ethers.parseUnits("100000", 18); // Mettre en vente 100,000 SLT
  let saleDeadline: number;

  beforeEach(async function () {
    [owner, buyer1, buyer2, otherUser] = await ethers.getSigners();

    // 1. Déployer le token ERC20 de vente (MinimalERC20)
    const MinimalERC20Factory = await ethers.getContractFactory("MinimalERC20", owner);
    saleToken = await MinimalERC20Factory.deploy(tokenName, tokenSymbol, ethers.parseUnits("1000000", 0), owner.address) as MinimalERC20; // Supply en unités entières
    await saleToken.waitForDeployment();
    const saleTokenAddress = await saleToken.getAddress();

    // 2. Configurer la deadline pour la vente (ex: 1 heure à partir de maintenant)
    const latestBlock = await ethers.provider.getBlock("latest");
    if (!latestBlock) throw new Error("Failed to get latest block");
    saleDeadline = latestBlock.timestamp + 3600; // 1 heure

    // 3. Déployer le contrat SimpleLaunchpad
    const SimpleLaunchpadFactory = await ethers.getContractFactory("SimpleLaunchpad", owner);
    launchpad = await SimpleLaunchpadFactory.deploy(
      saleTokenAddress,
      pricePerTokenInWei,
      amountToSellInLaunchpad,
      saleDeadline,
      owner.address
    ) as SimpleLaunchpad;
    await launchpad.waitForDeployment();
    const launchpadAddress = await launchpad.getAddress();

    // 4. Transférer les tokens à vendre au contrat Launchpad
    await saleToken.connect(owner).transfer(launchpadAddress, amountToSellInLaunchpad);
  });

  describe("Deployment & Configuration", function () {
    it("Should set the correct owner", async function () {
      expect(await launchpad.owner()).to.equal(owner.address);
    });

    it("Should have the correct token address", async function () {
      expect(await launchpad.token()).to.equal(await saleToken.getAddress());
    });

    it("Should have the correct price", async function () {
      expect(await launchpad.price()).to.equal(pricePerTokenInWei);
    });

    it("Should have the correct amount to sell", async function () {
      expect(await launchpad.amountToSell()).to.equal(amountToSellInLaunchpad);
    });

    it("Should have the correct deadline", async function () {
      expect(await launchpad.deadline()).to.equal(saleDeadline);
    });

    it("Should have the launchpad contract holding the tokens to sell", async function () {
        expect(await saleToken.balanceOf(await launchpad.getAddress())).to.equal(amountToSellInLaunchpad);
    });
  });

  describe("Buying Tokens", function () {
    it("Should allow users to buy tokens", async function () {
      const tokensToBuy = ethers.parseUnits("100", 18); // Acheter 100 SLT
      const requiredETH = tokensToBuy * pricePerTokenInWei / ethers.parseUnits("1", 18) ; // Ajustement car price est par token unitaire

      await expect(launchpad.connect(buyer1).buy(tokensToBuy, { value: requiredETH }))
        .to.emit(launchpad, "TokensPurchased")
        .withArgs(buyer1.address, tokensToBuy, requiredETH);

      expect(await saleToken.balanceOf(buyer1.address)).to.equal(tokensToBuy);
      expect(await launchpad.totalSold()).to.equal(tokensToBuy);
      expect(await launchpad.raisedAmount()).to.equal(requiredETH);
      expect(await launchpad.contributions(buyer1.address)).to.equal(requiredETH);
    });

    it("Should refund excess ETH if more is sent", async function () {
        const tokensToBuy = ethers.parseUnits("50", 18);
        const exactETHRequired = tokensToBuy * pricePerTokenInWei / ethers.parseUnits("1",18);
        const sentETH = exactETHRequired + ethers.parseEther("0.1"); // Envoyer 0.1 ETH en trop

        const initialBuyerBalance = await ethers.provider.getBalance(buyer1.address);
        const tx = await launchpad.connect(buyer1).buy(tokensToBuy, { value: sentETH });
        const receipt = await tx.wait();
        if (!receipt) throw new Error("Transaction receipt not found");
        const gasUsed = receipt.gasUsed * receipt.gasPrice;
        const finalBuyerBalance = await ethers.provider.getBalance(buyer1.address);

        // Vérifier que l'acheteur a été remboursé de l'excédent (moins le gaz)
        expect(initialBuyerBalance - finalBuyerBalance).to.be.closeTo(exactETHRequired + gasUsed, ethers.parseUnits("0.0001", "ether"));
        expect(await launchpad.raisedAmount()).to.equal(exactETHRequired);
      });

    it("Should fail if not enough ETH is sent", async function () {
      const tokensToBuy = ethers.parseUnits("100", 18);
      const notEnoughETH = (tokensToBuy * pricePerTokenInWei / ethers.parseUnits("1",18)) - BigInt(1); // 1 wei de moins

      await expect(launchpad.connect(buyer1).buy(tokensToBuy, { value: notEnoughETH }))
        .to.be.revertedWithCustomError(launchpad, "NotEnoughETHSent");
    });

    it("Should fail if trying to buy more tokens than available", async function () {
      const tooManyTokens = amountToSellInLaunchpad + BigInt(1);
      const requiredETH = tooManyTokens * pricePerTokenInWei / ethers.parseUnits("1",18);

      await expect(launchpad.connect(buyer1).buy(tooManyTokens, { value: requiredETH }))
        .to.be.revertedWithCustomError(launchpad, "AmountExceedsSaleSupply");
    });

    it("Should fail if trying to buy zero tokens", async function () {
        await expect(launchpad.connect(buyer1).buy(0, { value: 0 }))
          .to.be.revertedWithCustomError(launchpad, "AmountExceedsSaleSupply"); // Ou une erreur plus spécifique
      });

    it("Should fail if sale deadline has passed", async function () {
      await time.increaseTo(saleDeadline + 1); // Avancer le temps après la deadline

      const tokensToBuy = ethers.parseUnits("10", 18);
      const requiredETH = tokensToBuy * pricePerTokenInWei / ethers.parseUnits("1",18);
      await expect(launchpad.connect(buyer1).buy(tokensToBuy, { value: requiredETH }))
        .to.be.revertedWithCustomError(launchpad, "SaleEnded");
    });
  });

  describe("Withdrawals", function () {
    beforeEach(async function() {
      // Buyer1 achète quelques tokens pour qu'il y ait des fonds à retirer
      const tokensToBuy = ethers.parseUnits("200", 18);
      const requiredETH = tokensToBuy * pricePerTokenInWei / ethers.parseUnits("1",18);
      await launchpad.connect(buyer1).buy(tokensToBuy, { value: requiredETH });
    });

    it("Should allow owner to withdraw funds after deadline", async function () {
      await time.increaseTo(saleDeadline + 1);
      const initialOwnerETHBalance = await ethers.provider.getBalance(owner.address);
      const raisedETH = await launchpad.raisedAmount();

      const tx = await launchpad.connect(owner).withdrawFunds();
      const receipt = await tx.wait();
      if (!receipt) throw new Error("Transaction receipt not found");
      const gasUsed = receipt.gasUsed * receipt.gasPrice;

      expect(await launchpad.raisedAmount()).to.equal(0);
      const finalOwnerETHBalance = await ethers.provider.getBalance(owner.address);
      expect(finalOwnerETHBalance).to.equal(initialOwnerETHBalance + raisedETH - gasUsed);
      await expect(tx).to.emit(launchpad, "FundsWithdrawn").withArgs(owner.address, raisedETH);
    });

    it("Should fail if non-owner tries to withdraw funds", async function () {
      await time.increaseTo(saleDeadline + 1);
      await expect(launchpad.connect(otherUser).withdrawFunds())
      .to.be.revertedWithCustomError(launchpad, "OwnableUnauthorizedAccount")
      .withArgs(otherUser.address);
    });

    it("Should fail to withdraw funds if sale not ended", async function () {
      await expect(launchpad.connect(owner).withdrawFunds())
        .to.be.revertedWithCustomError(launchpad, "SaleNotActive"); // Ou l'erreur spécifique
    });

    it("Should fail to withdraw funds if no funds to withdraw", async function () {
        // Vider les fonds en les retirant une première fois
        await time.increaseTo(saleDeadline + 1);
        await launchpad.connect(owner).withdrawFunds();
        // Tenter de retirer à nouveau
        await expect(launchpad.connect(owner).withdrawFunds())
          .to.be.revertedWithCustomError(launchpad, "NoFundsToWithdraw");
      });

    it("Should allow owner to withdraw unsold tokens after deadline", async function () {
      await time.increaseTo(saleDeadline + 1);
      const unsoldTokens = await launchpad.getRemainingTokens();
      const initialOwnerTokenBalance = await saleToken.balanceOf(owner.address);

      if (unsoldTokens > 0) {
        await expect(launchpad.connect(owner).withdrawUnsoldTokens())
          .to.emit(launchpad, "UnsoldTokensWithdrawn")
          .withArgs(owner.address, unsoldTokens);
        expect(await saleToken.balanceOf(owner.address)).to.equal(initialOwnerTokenBalance + unsoldTokens);
        expect(await saleToken.balanceOf(await launchpad.getAddress())).to.equal(0);
      } else {
        await expect(launchpad.connect(owner).withdrawUnsoldTokens())
        .to.be.revertedWithCustomError(launchpad, "NoUnsoldTokensToWithdraw");
      }
    });

    it("Should fail if non-owner tries to withdraw unsold tokens", async function () {
        await time.increaseTo(saleDeadline + 1);
        await expect(launchpad.connect(otherUser).withdrawUnsoldTokens())
        .to.be.revertedWithCustomError(launchpad, "OwnableUnauthorizedAccount")
        .withArgs(otherUser.address);
      });
  });

  describe("getRemainingTokens", function() {
    it("Should return the correct amount of remaining tokens", async function() {
        expect(await launchpad.getRemainingTokens()).to.equal(amountToSellInLaunchpad);
        const tokensToBuy = ethers.parseUnits("100", 18);
        const requiredETH = tokensToBuy * pricePerTokenInWei / ethers.parseUnits("1",18);
        await launchpad.connect(buyer1).buy(tokensToBuy, { value: requiredETH });
        expect(await launchpad.getRemainingTokens()).to.equal(amountToSellInLaunchpad - tokensToBuy);
    });
  });

});
