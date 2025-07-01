import { ethers } from "hardhat";
import { expect } from "chai";
import { MinimalERC20 } from "../typechain-types"; // Import des typages générés par TypeChain
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers"; // Typage pour les signers

describe("MinimalERC20 Contract", function () {
  let MinimalERC20Factory;
  let minimalERC20: MinimalERC20;
  let owner: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;
  let addr2: HardhatEthersSigner;

  const tokenName = "Test Token";
  const tokenSymbol = "TST";
  const initialSupplyRaw = BigInt(1000000); // 1 million de tokens en unités entières
  const expectedDecimals = 18; // ERC20 d'OpenZeppelin a 18 décimales par défaut

  beforeEach(async function () {
    // Obtenir les signers (comptes de test)
    [owner, addr1, addr2] = await ethers.getSigners();

    // Déployer une nouvelle instance du contrat avant chaque test
    MinimalERC20Factory = await ethers.getContractFactory("MinimalERC20");
    // La supply initiale pour le constructeur est en unités entières
    minimalERC20 = (await MinimalERC20Factory.deploy(
      tokenName,
      tokenSymbol,
      initialSupplyRaw,
      owner.address  // Le owner du contrat et celui qui reçoit la supply initiale
    )) as unknown as MinimalERC20; // Cast car la factory retourne Contract, mais on sait que c'est MinimalERC20
    await minimalERC20.waitForDeployment(); // Attendre que le contrat soit déployé
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await minimalERC20.owner()).to.equal(owner.address);
    });

    it("Should have the correct name", async function () {
      expect(await minimalERC20.name()).to.equal(tokenName);
    });

    it("Should have the correct symbol", async function () {
      expect(await minimalERC20.symbol()).to.equal(tokenSymbol);
    });

    it("Should have the correct decimals", async function () {
      expect(await minimalERC20.decimals()).to.equal(expectedDecimals);
    });

    it("Should assign the total supply of tokens to the owner (deployer)", async function () {
      const ownerBalance = await minimalERC20.balanceOf(owner.address);
      const expectedTotalSupply = initialSupplyRaw * (BigInt(10) ** BigInt(expectedDecimals));
      expect(await minimalERC20.totalSupply()).to.equal(expectedTotalSupply);
      expect(ownerBalance).to.equal(expectedTotalSupply);
    });

    it("Should have zero supply for other accounts", async function () {
        expect(await minimalERC20.balanceOf(addr1.address)).to.equal(0);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const amountToTransfer = BigInt(100) * (BigInt(10) ** BigInt(expectedDecimals)); // 100 TST

      // Transférer des tokens du owner vers addr1
      await expect(minimalERC20.connect(owner).transfer(addr1.address, amountToTransfer))
        .to.emit(minimalERC20, "Transfer")
        .withArgs(owner.address, addr1.address, amountToTransfer);

      const addr1Balance = await minimalERC20.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(amountToTransfer);

      const ownerBalanceAfterTransfer = await minimalERC20.balanceOf(owner.address);
      const expectedOwnerBalance = (initialSupplyRaw * (BigInt(10) ** BigInt(expectedDecimals))) - amountToTransfer;
      expect(ownerBalanceAfterTransfer).to.equal(expectedOwnerBalance);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await minimalERC20.balanceOf(owner.address);
      // Tenter de transférer plus de tokens que le owner n'en possède (depuis addr1 qui n'a rien)
      await expect(
        minimalERC20.connect(addr1).transfer(owner.address, BigInt(1))
      ).to.be.revertedWithCustomError(minimalERC20, "ERC20InsufficientBalance");
      // S'assurer que le solde du owner n'a pas changé
      expect(await minimalERC20.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });

    it("Should update allowances correctly", async function () {
        const amountToApprove = BigInt(50) * (BigInt(10) ** BigInt(expectedDecimals));
        await expect(minimalERC20.connect(owner).approve(addr1.address, amountToApprove))
            .to.emit(minimalERC20, "Approval")
            .withArgs(owner.address, addr1.address, amountToApprove);

        expect(await minimalERC20.allowance(owner.address, addr1.address)).to.equal(amountToApprove);
    });

    it("Should handle transferFrom correctly", async function () {
        const amountToApproveAndTransfer = BigInt(50) * (BigInt(10) ** BigInt(expectedDecimals));
        // Owner approuve addr1 pour dépenser des tokens
        await minimalERC20.connect(owner).approve(addr1.address, amountToApproveAndTransfer);

        // Addr1 transfère des tokens du owner vers addr2
        await expect(minimalERC20.connect(addr1).transferFrom(owner.address, addr2.address, amountToApproveAndTransfer))
            .to.emit(minimalERC20, "Transfer")
            .withArgs(owner.address, addr2.address, amountToApproveAndTransfer);

        expect(await minimalERC20.balanceOf(addr2.address)).to.equal(amountToApproveAndTransfer);
        expect(await minimalERC20.allowance(owner.address, addr1.address)).to.equal(0); // Allowance est consommée
    });

    it("Should fail transferFrom if allowance is insufficient", async function () {
        const amountToApprove = BigInt(50) * (BigInt(10) ** BigInt(expectedDecimals));
        const amountToTransfer = BigInt(100) * (BigInt(10) ** BigInt(expectedDecimals)); // Plus que l'allowance

        await minimalERC20.connect(owner).approve(addr1.address, amountToApprove);

        await expect(
            minimalERC20.connect(addr1).transferFrom(owner.address, addr2.address, amountToTransfer)
        ).to.be.revertedWithCustomError(minimalERC20, "ERC20InsufficientAllowance");
    });
  });

  // Optionnel: Test pour une fonction mint (si ajoutée et Ownable)
  describe("Minting (Optional - if mint function is added and Ownable)", function() {
    // Supposons qu'une fonction mint comme celle-ci soit ajoutée au contrat :
    // function mint(address to, uint256 amount) public onlyOwner { _mint(to, amount); }
    // it("Should allow owner to mint new tokens", async function() {
    //   const mintAmount = BigInt(500) * (BigInt(10) ** BigInt(expectedDecimals));
    //   const initialTotalSupply = await minimalERC20.totalSupply();
    //
    //   await expect(minimalERC20.connect(owner).mint(addr1.address, mintAmount))
    //     .to.emit(minimalERC20, "Transfer")
    //     .withArgs(ethers.ZeroAddress, addr1.address, mintAmount); // Minting émet un Transfer depuis l'adresse zéro
    //
    //   expect(await minimalERC20.balanceOf(addr1.address)).to.equal(mintAmount);
    //   expect(await minimalERC20.totalSupply()).to.equal(initialTotalSupply + mintAmount);
    // });
    //
    // it("Should prevent non-owners from minting tokens", async function() {
    //   const mintAmount = BigInt(100) * (BigInt(10) ** BigInt(expectedDecimals));
    //   await expect(
    //     minimalERC20.connect(addr1).mint(addr1.address, mintAmount)
    //   ).to.be.revertedWithCustomError(minimalERC20, "OwnableUnauthorizedAccount") // Ou l'erreur Ownable standard
    //   .withArgs(addr1.address);
    // });
  });
});
