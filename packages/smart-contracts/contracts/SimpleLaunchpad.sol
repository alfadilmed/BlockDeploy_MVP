// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol"; // Pour la sécurité des fonctions de retrait et d'achat

/**
 * @title SimpleLaunchpad
 * @dev Un contrat simple pour une levée de fonds (ICO/IDO) d'un token ERC20.
 * Le contrat doit détenir les tokens ERC20 mis en vente AVANT le début de la vente.
 * Le propriétaire du contrat (créateur du launchpad) doit transférer les tokens à vendre
 * à l'adresse de ce contrat SimpleLaunchpad après son déploiement.
 * Les achats se font en ETH.
 */
contract SimpleLaunchpad is Ownable, ReentrancyGuard {
    IERC20 public immutable token; // Le token ERC20 à vendre
    uint256 public immutable price; // Prix d'UN SEUL token en wei (ETH). Ex: si 1 ETH = 1000 tokens, price = 1 ETH / 1000 = 1e18 / 1000
    uint256 public immutable amountToSell; // Quantité totale de tokens mis en vente (avec décimales du token)
    uint256 public immutable deadline; // Timestamp de fin de la vente

    uint256 public totalSold; // Quantité totale de tokens vendus (avec décimales)
    uint256 public raisedAmount; // Montant total d'ETH récolté (en wei)

    mapping(address => uint256) public contributions; // Montant d'ETH contribué par acheteur

    event TokensPurchased(address indexed buyer, uint256 amountTokens, uint256 amountETH);
    event FundsWithdrawn(address indexed owner, uint256 amountETH);
    event UnsoldTokensWithdrawn(address indexed owner, uint256 amountTokens);

    error SaleNotActive();
    error SaleEnded();
    error NotEnoughETHSent();
    error AmountExceedsSaleSupply();
    error TransferFailed();
    error NoFundsToWithdraw();
    error NoUnsoldTokensToWithdraw();
    error WithdrawalFailed();

    /**
     * @dev Constructeur du contrat Launchpad.
     * @param tokenAddress_ Adresse du token ERC20 à vendre.
     * @param pricePerToken_ Prix d'un token en wei.
     * @param amountToSell_ Quantité totale de tokens à vendre (avec leurs décimales).
     * @param deadline_ Timestamp Unix de fin de la vente.
     * @param initialOwner_ Adresse du propriétaire du Launchpad.
     */
    constructor(
        address tokenAddress_,
        uint256 pricePerToken_,
        uint256 amountToSell_,
        uint256 deadline_,
        address initialOwner_
    ) Ownable(initialOwner_) {
        require(tokenAddress_ != address(0), "SimpleLaunchpad: Token address cannot be zero");
        require(pricePerToken_ > 0, "SimpleLaunchpad: Price must be greater than zero");
        require(amountToSell_ > 0, "SimpleLaunchpad: Amount to sell must be greater than zero");
        require(deadline_ > block.timestamp, "SimpleLaunchpad: Deadline must be in the future");

        token = IERC20(tokenAddress_);
        price = pricePerToken_;
        amountToSell = amountToSell_;
        deadline = deadline_;
    }

    /**
     * @dev Permet à un utilisateur d'acheter des tokens.
     * L'utilisateur envoie de l'ETH et spécifie combien de tokens il souhaite acheter.
     * @param tokenAmountToBuy Quantité de tokens que l'utilisateur souhaite acheter (avec décimales).
     */
    function buy(uint256 tokenAmountToBuy) public payable nonReentrant {
        if (block.timestamp >= deadline) revert SaleEnded();
        if (tokenAmountToBuy == 0) revert AmountExceedsSaleSupply(); // Ou une erreur plus spécifique "Amount must be > 0"

        uint256 remainingToSell = amountToSell - totalSold;
        if (tokenAmountToBuy > remainingToSell) revert AmountExceedsSaleSupply();

        uint256 requiredETH = tokenAmountToBuy * price;
        if (msg.value < requiredETH) revert NotEnoughETHSent();

        totalSold += tokenAmountToBuy;
        raisedAmount += requiredETH; // On ne garde que l'ETH nécessaire
        contributions[msg.sender] += requiredETH;

        // Transférer les tokens à l'acheteur
        // Le contrat Launchpad doit déjà posséder ces tokens.
        bool sent = token.transfer(msg.sender, tokenAmountToBuy);
        if (!sent) revert TransferFailed();

        // Rembourser l'excédent d'ETH si l'utilisateur en a envoyé trop
        if (msg.value > requiredETH) {
            (bool success, ) = msg.sender.call{value: msg.value - requiredETH}("");
            // Pas de revert si le remboursement échoue, mais l'événement doit le signaler
            // ou alors on peut choisir de faire un revert si le remboursement échoue pour la simplicité du MVP.
            // Pour ce MVP, on ne fait pas de revert sur l'échec du remboursement.
            require(success, "SimpleLaunchpad: ETH refund failed");
        }

        emit TokensPurchased(msg.sender, tokenAmountToBuy, requiredETH);
    }

    /**
     * @dev Permet au propriétaire de retirer les ETH récoltés.
     * Ne peut être appelé qu'après la fin de la vente.
     */
    function withdrawFunds() public onlyOwner nonReentrant {
        if (block.timestamp < deadline) revert SaleNotActive(); // Ou une erreur "Sale still active"
        if (raisedAmount == 0) revert NoFundsToWithdraw();

        uint256 amountToWithdraw = raisedAmount;
        raisedAmount = 0; // Réinitialiser avant le transfert pour éviter réentrance sur raisedAmount

        (bool success, ) = owner().call{value: amountToWithdraw}("");
        if (!success) revert WithdrawalFailed();

        emit FundsWithdrawn(owner(), amountToWithdraw);
    }

    /**
     * @dev Permet au propriétaire de retirer les tokens non vendus.
     * Ne peut être appelé qu'après la fin de la vente.
     */
    function withdrawUnsoldTokens() public onlyOwner nonReentrant {
        if (block.timestamp < deadline) revert SaleNotActive(); // Ou une erreur "Sale still active"

        uint256 unsoldTokens = amountToSell - totalSold;
        if (unsoldTokens == 0) revert NoUnsoldTokensToWithdraw();

        // Pour éviter la réentrance sur totalSold, on pourrait le mettre à amountToSell ici.
        // Mais comme on transfère tous les unsoldTokens, le problème est moins critique.
        // Cependant, par sécurité, on pourrait vouloir s'assurer qu'il n'y a plus de tokens à vendre.
        // totalSold = amountToSell; // Optionnel, pour bloquer d'autres ventes si bug

        bool sent = token.transfer(owner(), unsoldTokens);
        if (!sent) revert TransferFailed(); // Ou une erreur plus spécifique

        emit UnsoldTokensWithdrawn(owner(), unsoldTokens);
    }

    /**
     * @dev Retourne la quantité de tokens encore disponibles à la vente.
     */
    function getRemainingTokens() public view returns (uint256) {
        return amountToSell - totalSold;
    }

    // Fonction pour recevoir de l'ETH directement (nécessaire pour que le contrat puisse garder l'ETH des achats)
    receive() external payable {}
}
