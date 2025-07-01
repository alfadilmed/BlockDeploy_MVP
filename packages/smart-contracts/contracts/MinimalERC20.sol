// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; // Optionnel, si on veut des fonctions Ownable

/**
 * @title MinimalERC20
 * @dev Un contrat ERC20 simple avec un constructeur pour le nom, le symbole et la supply initiale.
 * Les décimales sont fixées à 18 par défaut par le contrat ERC20 d'OpenZeppelin.
 * La supply initiale est fournie en unités entières et est convertie en utilisant les décimales.
 */
contract MinimalERC20 is ERC20, Ownable { // Ownable est ajouté pour un contrôle d'accès potentiel futur
    /**
     * @dev Constructeur qui initialise le token.
     * @param name_ Le nom du token.
     * @param symbol_ Le symbole du token.
     * @param initialSupply_ La supply initiale du token, en unités entières (sans les décimales).
     * Par exemple, pour 1,000,000 tokens avec 18 décimales, passer 1000000.
     * @param initialOwner_ L'adresse qui recevra la supply initiale et deviendra propriétaire du contrat.
     */
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply_,
        address initialOwner_
    ) ERC20(name_, symbol_) Ownable(initialOwner_) {
        // _mint attend la supply avec les décimales appliquées.
        // La fonction decimals() du contrat ERC20 d'OpenZeppelin retourne 18 par défaut.
        if (initialSupply_ > 0) {
            _mint(initialOwner_, initialSupply_ * (10**decimals()));
        }
    }

    // Vous pouvez ajouter d'autres fonctionnalités ici si nécessaire, par exemple :
    // function mint(address to, uint256 amount) public onlyOwner {
    //     _mint(to, amount);
    // }
    //
    // function burn(uint256 amount) public { // Ou burnFrom si vous voulez une logique d'allowance
    //     _burn(msg.sender, amount);
    // }
}
