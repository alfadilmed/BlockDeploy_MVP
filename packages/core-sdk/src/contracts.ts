'use client';

import {
  useReadContract as useWagmiReadContract,
  useWriteContract as useWagmiWriteContract,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  // type UseReadContractParameters, // Non utilisé directement pour l'instant
  // type UseWriteContractParameters, // Non utilisé directement pour l'instant
  // type UseWatchContractEventParameters, // Non utilisé directement pour l'instant
} from 'wagmi';
import type {
  ContractReadOptions,
  ContractWriteOptions,
  ContractEventOptions,
} from './types';
import { Abi } from 'viem';

/**
 * Hook pour lire des données d'un smart contract.
 * Wrapper autour de useReadContract de wagmi.
 *
 * @template TAbi L'ABI du contrat.
 * @template TFunctionName Le nom de la fonction à appeler.
 * @param options Les options pour la lecture du contrat.
 * @returns Le résultat de la lecture du contrat, l'état de chargement et les erreurs.
 */
export function useBlockDeployContractRead<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi, 'pure' | 'view'>, // Utiliser le type wagmi correct
>(
  options: ContractReadOptions<TAbi, TFunctionName> & { enabled?: boolean } // Ajout de 'enabled' pour le contrôle conditionnel
) {
  const { address, abi, functionName, args, chainId, enabled = true } = options;
  const { data, error, isLoading, isFetching, refetch, status, fetchStatus } = useWagmiReadContract({
    address: address,
    abi: abi,
    functionName: functionName as any, // Cast 'as any' car TFunctionName peut être trop restrictif ici pour l'usage direct
    args: args as any, // Cast 'as any' pour la même raison
    chainId: chainId,
    query: {
      enabled: enabled && !!address && !!abi && !!functionName, // Le hook s'exécute si enabled ET les params de base sont là
    },
    // ...autres options de wagmi peuvent être passées ici si elles sont ajoutées à ContractReadOptions
  });

  return {
    data,
    error: error instanceof Error ? error : null,
    isLoading, // isLoading de la requête initiale
    isFetching, // isFetching pour les refetches en arrière-plan
    status, // 'idle' | 'pending' | 'success' | 'error'
    fetchStatus, // 'idle' | 'fetching' | 'paused'
    refetch,
  };
}

/**
 * Hook pour écrire des données sur un smart contract.
 * Wrapper autour de useWriteContract de wagmi.
 *
 * @template TAbi L'ABI du contrat.
 * @template TFunctionName Le nom de la fonction à appeler.
 * @returns Fonctions pour initier l'écriture, état de la transaction, et erreurs.
 */
export function useBlockDeployContractWrite<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string, // Simplifié pour le placeholder
>() {
  // TODO: Implémenter la logique en utilisant useWagmiWriteContract et useWaitForTransactionReceipt
  // Exemple basique (nécessitera d'adapter les types d'options pour la fonction write):
  // const { data: hash, writeContract, isPending, error } = useWagmiWriteContract();
  // const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  //
  // const write = (options: ContractWriteOptions<TAbi, any>) => {
  //   writeContract({
  //     address: options.address,
  //     abi: options.abi,
  //     functionName: options.functionName,
  //     args: options.args,
  //     value: options.value,
  //     chainId: options.chainId,
  //   });
  // }
  // return { write, hash, isPending, isConfirming, isConfirmed, error }

  console.warn('useBlockDeployContractWrite is a placeholder and not yet implemented.');
  return {
    write: (options: ContractWriteOptions<TAbi, any>) => { console.log('Simulating contract write:', options); },
    hash: undefined,
    isPending: false,
    isConfirming: false,
    isConfirmed: false,
    error: null,
  };
}

/**
 * Hook pour écouter les événements émis par un smart contract.
 * Wrapper autour de useWatchContractEvent de wagmi.
 *
 * @template TAbi L'ABI du contrat.
 * @template TEventName Le nom de l'événement à écouter.
 * @param options Les options pour l'écoute des événements.
 */
export function useBlockDeployContractEvent<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string | undefined = undefined,
>(options: ContractEventOptions<TAbi, TEventName>) {
  // TODO: Implémenter la logique en utilisant useWatchContractEvent
  // useWagmiWatchContractEvent({
  //   address: options.address,
  //   abi: options.abi,
  //   eventName: options.eventName,
  //   onLogs: options.listener,
  //   chainId: options.chainId,
  // });
  console.warn('useBlockDeployContractEvent is a placeholder and not yet implemented.');
  // Ce hook ne retourne généralement rien, il déclenche un callback.
}

// --- Hook pour le déploiement de contrat ---

/**
 * Arguments pour le hook useDeployToken.
 */
export interface DeployTokenArgs {
  name: string;
  symbol: string;
  initialSupply: bigint; // Doit être déjà ajusté avec les décimales
  initialOwner: `0x${string}`; // Ajout du propriétaire initial
  contractAbi: Abi;
  contractBytecode: `0x${string}`;
}

// --- Hooks pour SimpleLaunchpad ---

/**
 * Arguments pour le hook useCreateLaunchpad (déploiement de SimpleLaunchpad.sol).
 */
export interface CreateLaunchpadArgs {
  tokenAddress: `0x${string}`;
  pricePerToken: bigint; // Prix d'un token en wei
  amountToSell: bigint;  // Quantité de tokens à vendre (avec décimales)
  deadline: bigint;      // Timestamp Unix de fin de vente
  // initialOwner est automatiquement l'adresse du wallet connecté qui déploie
  // contractAbi et contractBytecode seront ceux de SimpleLaunchpad, passés en interne par le hook
}

/**
 * Hook pour déployer un contrat de token (ou tout autre contrat).
 * Encapsule useWriteContract et useWaitForTransactionReceipt pour le déploiement.
 */
export function useDeployToken() {
  const {
    data: deployTxHash,
    error: deployError,
    isPending: isDeploying,
    writeContractAsync // Renommé pour clarté, anciennement writeContract (synchrone)
  } = useWagmiWriteContract();

  const {
    data: receipt,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmationError
  } = useWaitForTransactionReceipt({
    hash: deployTxHash,
    query: { enabled: !!deployTxHash } // N'exécute que si hash est défini
  });

  const deployToken = async (args: DeployTokenArgs) => {
    if (!args.contractBytecode || !args.contractAbi) {
      console.error("ABI et Bytecode sont requis pour le déploiement.");
      // On pourrait throw une erreur ici ou retourner un état d'erreur spécifique
      return;
    }
    try {
      // Pour le déploiement, `abi` est l'ABI du contrat, `bytecode` est le code compilé,
      // et `args` sont les arguments du constructeur.
      // `functionName` n'est pas utilisé pour le déploiement avec writeContract.
      // La transaction de déploiement n'a pas de `to`, elle a un champ `data` qui est le bytecode
      // optionnellement suivi des arguments du constructeur encodés.
      // Wagmi gère cela en interne si on passe `bytecode` et `args`.
      await writeContractAsync({
        abi: args.contractAbi,
        bytecode: args.contractBytecode,
        args: [args.name, args.symbol, args.initialSupply, args.initialOwner], // Arguments du constructeur mis à jour
        // value: 0n, // Si le constructeur est payable
        // chainId: args.chainId, // Si on veut forcer une chaîne
      });
    } catch (e) {
      // L'erreur est déjà gérée par deployError de useWriteContract,
      // mais on peut la logguer ou la traiter spécifiquement ici si besoin.
      console.error("Erreur lors de l'initiation du déploiement:", e);
      // Pas besoin de throw ici car useWriteContract met à jour son propre état d'erreur.
    }
  };

  return {
    deployToken,
    deployTxHash,
    isDeploying, // True quand la transaction est envoyée au wallet / en attente de signature
    deployError,
    isConfirming, // True pendant que la transaction est minée
    isConfirmed,  // True quand la transaction est confirmée
    confirmationError,
    contractAddress: receipt?.contractAddress, // Adresse du contrat déployé
    receipt, // Reçu complet de la transaction pour plus de détails si besoin
  };
}


/**
 * Hook pour déployer un contrat SimpleLaunchpad.
 */
export function useCreateLaunchpad() {
  const { account } = useBlockDeployWallet(); // Pour obtenir l'adresse du déployeur (initialOwner)
  const {
    data: deployTxHash,
    error: deployError,
    isPending: isDeploying,
    writeContractAsync
  } = useWagmiWriteContract();

  const {
    data: receipt,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmationError
  } = useWaitForTransactionReceipt({
    hash: deployTxHash,
    query: { enabled: !!deployTxHash }
  });

  const createLaunchpad = async (args: CreateLaunchpadArgs) => {
    if (!account.address) {
      console.error("Portefeuille non connecté. Impossible de déterminer l'initialOwner.");
      // Gérer cette erreur, peut-être retourner une promesse rejetée ou un état d'erreur spécifique
      throw new Error("Portefeuille non connecté.");
    }
    if (simpleLaunchpadBytecode.length < 1000) { // Vérification du bytecode placeholder
        console.error("Tentative de déploiement du Launchpad avec un bytecode placeholder. Veuillez remplacer `simpleLaunchpadBytecode` dans le core-sdk.");
        throw new Error("Erreur de configuration: Bytecode du contrat Launchpad invalide.");
    }

    try {
      await writeContractAsync({
        abi: simpleLaunchpadAbi, // ABI de SimpleLaunchpad
        bytecode: simpleLaunchpadBytecode, // Bytecode de SimpleLaunchpad
        args: [ // Arguments du constructeur de SimpleLaunchpad.sol
          args.tokenAddress,
          args.pricePerToken,
          args.amountToSell,
          args.deadline,
          account.address // initialOwner est l'adresse du wallet connecté
        ],
      });
    } catch (e) {
      console.error("Erreur lors de l'initiation du déploiement du Launchpad:", e);
      // L'erreur est gérée par deployError de useWriteContract
    }
  };

  return {
    createLaunchpad,
    deployTxHash,
    isDeploying,
    deployError,
    isConfirming,
    isConfirmed,
    confirmationError,
    contractAddress: receipt?.contractAddress,
    receipt,
  };
}

// --- Hooks d'interaction avec un SimpleLaunchpad déployé ---

/**
 * Arguments pour le hook useLaunchpadBuy.
 */
export interface LaunchpadBuyArgs {
  launchpadAddress: `0x${string}`;
  tokenAmountToBuy: bigint; // Quantité de tokens à acheter (avec décimales du token)
  // la valeur en ETH est calculée et envoyée avec la transaction
}

/**
 * Hook pour acheter des tokens depuis un contrat SimpleLaunchpad.
 */
export function useLaunchpadBuy() {
  const {
    data: buyTxHash,
    error: buyError,
    isPending: isSendingBuyTx,
    writeContractAsync
  } = useWagmiWriteContract();

  const {
    data: receipt,
    isLoading: isConfirmingBuy,
    isSuccess: isBuyConfirmed,
    error: confirmationBuyError
  } = useWaitForTransactionReceipt({
    hash: buyTxHash,
    query: { enabled: !!buyTxHash }
  });

  // Nécessite de lire le prix depuis le contrat pour calculer la msg.value
  // Cela pourrait être passé en argument ou lu ici. Pour simplifier, on suppose que le prix est connu.
  // Dans une vraie dApp, on lirait le prix avec useLaunchpadStatus ou useBlockDeployContractRead.
  const buyTokens = async (args: LaunchpadBuyArgs, pricePerTokenInWei: bigint) => {
    if (pricePerTokenInWei === 0n) {
        console.error("Le prix par token ne peut pas être zéro.");
        throw new Error("Prix par token invalide.");
    }
    const requiredETH = args.tokenAmountToBuy * pricePerTokenInWei / (10n**18n); // Simulation si pricePerTokenInWei est le prix d'1 token en wei (1 ETH = 10^18 wei)
                                                                              // En fait, si price est le prix d'un token en wei, alors requiredETH = tokenAmountToBuy * price
                                                                              // Le contrat SimpleLaunchpad.sol attend que 'price' soit le prix d'un token.
                                                                              // Donc, requiredETH = args.tokenAmountToBuy * price (le prix est déjà en wei par token).
    const calculatedEthValue = (args.tokenAmountToBuy * pricePerTokenInWei) / BigInt(10** (18 - 0)); // Supposons que pricePerTokenInWei est pour un token unitaire (décimales 0)
                                                                                                  // Si le token a D décimales, et amountToBuy est en unités avec D décimales,
                                                                                                  // et price est en wei par token unitaire.
                                                                                                  // Le contrat SimpleLaunchpad.sol: `price` est le prix d'UN SEUL token.
                                                                                                  // `tokenAmountToBuy` est la quantité de tokens (avec leurs décimales).
                                                                                                  // Le contrat fait: `uint256 requiredETH = tokenAmountToBuy * price;`
                                                                                                  // Donc, le prix doit être par "plus petite unité de token".
                                                                                                  // Non, c'est plus simple: `price` est le prix d'1 token (ex: 0.001 ETH). `tokenAmountToBuy` est le nombre de tokens.
                                                                                                  // msg.value = tokenAmountToBuy * price.
                                                                                                  // Si price est en wei pour 1 token:
    const finalRequiredEth = args.tokenAmountToBuy * pricePerTokenInWei; // Ceci est correct si pricePerTokenInWei est le prix par plus petite unité de token
                                                                        // Si pricePerTokenInWei est le prix d'un token (ex: 0.001 ETH en wei), et tokenAmountToBuy est aussi en token (ex: 100 tokens)
                                                                        // alors il faut ajuster en fonction des décimales du token.
                                                                        // Le contrat SimpleLaunchpad.sol: `price` est le prix d'UN token.
                                                                        // `buy(uint256 tokenAmountToBuy)` -> `tokenAmountToBuy` est la quantité de tokens (avec ses propres décimales)
                                                                        // `requiredETH = tokenAmountToBuy * price` -> ceci est incorrect si price est par token unitaire et tokenAmountToBuy a des décimales.
                                                                        //
                                                                        // Réflexion: le contrat `SimpleLaunchpad.sol` a `price` comme `pricePerToken_`.
                                                                        // Et `buy(tokenAmountToBuy)` calcule `requiredETH = tokenAmountToBuy * price`.
                                                                        // Cela signifie que `tokenAmountToBuy` doit être en unités entières (pas avec décimales).
                                                                        // Ou que `price` est le prix de la plus petite fraction du token.
                                                                        // Supposons que l'UI demande `tokensAAcheterEnUnitesEntieres` et `tokenDecimals`.
                                                                        // `tokenAmountToBuy_pour_contrat = tokensAAcheterEnUnitesEntieres * (10**tokenDecimals)`
                                                                        // `msg.value = tokensAAcheterEnUnitesEntieres * priceDuContratParTokenUnitaire`
                                                                        // Donc, le `price` du contrat est par token unitaire.
                                                                        // Et `tokenAmountToBuy` dans `buy()` est la quantité en unités de token (pas la plus petite fraction).
                                                                        // Donc, msg.value = args.tokenAmountToBuy * priceFromContract (où priceFromContract est par token unitaire)
                                                                        //
                                                                        // Pour ce hook, `args.tokenAmountToBuy` est la quantité de tokens que l'utilisateur veut (ex: 100 tokens).
                                                                        // Le `pricePerTokenInWei` passé ici est le prix d'un token entier.
    const valueToSend = args.tokenAmountToBuy * pricePerTokenInWei;


    try {
      await writeContractAsync({
        address: args.launchpadAddress,
        abi: simpleLaunchpadAbi,
        functionName: 'buy',
        args: [args.tokenAmountToBuy], // tokenAmountToBuy (avec décimales du token)
        value: valueToSend, // ETH à envoyer (en wei)
      });
    } catch (e) {
      console.error("Erreur lors de l'achat de tokens:", e);
    }
  };

  return {
    buyTokens,
    buyTxHash,
    isSendingBuyTx,
    buyError,
    isConfirmingBuy,
    isBuyConfirmed,
    confirmationBuyError,
    buyReceipt: receipt,
  };
}


/**
 * Hook pour lire le statut d'un contrat SimpleLaunchpad.
 */
export function useLaunchpadStatus(launchpadAddress?: `0x${string}`) {
  const { data: token, isLoading: isLoadingToken } = useBlockDeployContractRead({
    address: launchpadAddress, abi: simpleLaunchpadAbi, functionName: 'token', enabled: !!launchpadAddress
  });
  const { data: price, isLoading: isLoadingPrice } = useBlockDeployContractRead({
    address: launchpadAddress, abi: simpleLaunchpadAbi, functionName: 'price', enabled: !!launchpadAddress
  });
  const { data: amountToSell, isLoading: isLoadingAmountToSell } = useBlockDeployContractRead({
    address: launchpadAddress, abi: simpleLaunchpadAbi, functionName: 'amountToSell', enabled: !!launchpadAddress
  });
  const { data: deadline, isLoading: isLoadingDeadline } = useBlockDeployContractRead({
    address: launchpadAddress, abi: simpleLaunchpadAbi, functionName: 'deadline', enabled: !!launchpadAddress
  });
  const { data: totalSold, isLoading: isLoadingTotalSold } = useBlockDeployContractRead({
    address: launchpadAddress, abi: simpleLaunchpadAbi, functionName: 'totalSold', enabled: !!launchpadAddress
  });
  const { data: raisedAmount, isLoading: isLoadingRaisedAmount } = useBlockDeployContractRead({
    address: launchpadAddress, abi: simpleLaunchpadAbi, functionName: 'raisedAmount', enabled: !!launchpadAddress
  });
  const { data: owner, isLoading: isLoadingOwner } = useBlockDeployContractRead({
    address: launchpadAddress, abi: simpleLaunchpadAbi, functionName: 'owner', enabled: !!launchpadAddress
  });
  // Pour lire les décimales du token vendu, on a besoin de son adresse et de l'ABI ERC20
  const { data: tokenDecimals, isLoading: isLoadingTokenDecimals } = useBlockDeployContractRead({
    address: token as `0x${string}` | undefined, // Adresse du token lue depuis le launchpad
    abi: minimalERC20Abi, // Utiliser l'ABI ERC20 minimal
    functionName: 'decimals',
    enabled: !!token, // Activer seulement si l'adresse du token est connue
  });
   const { data: tokenSymbol, isLoading: isLoadingTokenSymbol } = useBlockDeployContractRead({
    address: token as `0x${string}` | undefined,
    abi: minimalERC20Abi,
    functionName: 'symbol',
    enabled: !!token,
  });


  const isLoading = isLoadingToken || isLoadingPrice || isLoadingAmountToSell || isLoadingDeadline ||
                    isLoadingTotalSold || isLoadingRaisedAmount || isLoadingOwner || isLoadingTokenDecimals || isLoadingTokenSymbol;

  return {
    isLoading,
    status: {
      tokenAddress: token as `0x${string}` | undefined,
      tokenDecimals: tokenDecimals as number | undefined,
      tokenSymbol: tokenSymbol as string | undefined,
      pricePerToken: price as bigint | undefined,
      amountToSell: amountToSell as bigint | undefined,
      deadlineTimestamp: deadline as bigint | undefined,
      totalSold: totalSold as bigint | undefined,
      raisedAmountInWei: raisedAmount as bigint | undefined,
      ownerAddress: owner as `0x${string}` | undefined,
      isSaleActive: deadline ? Number(deadline) > Math.floor(Date.now() / 1000) : false,
      remainingToSell: (amountToSell && totalSold !== undefined) ? (amountToSell as bigint) - (totalSold as bigint) : undefined,
    }
  };
}


// --- Hook pour les Actions du Propriétaire du Launchpad ---

/**
 * Arguments pour les actions du propriétaire du Launchpad (généralement juste l'adresse du contrat).
 */
export interface LaunchpadOwnerActionParams {
  launchpadAddress: `0x${string}`;
}

/**
 * Hook pour gérer les actions du propriétaire d'un SimpleLaunchpad (withdrawFunds, withdrawUnsoldTokens).
 */
export function useLaunchpadOwnerActions() {
  // Hook pour withdrawFunds
  const {
    data: withdrawFundsTxHash,
    error: withdrawFundsError,
    isPending: isWithdrawingFunds,
    writeContractAsync: executeWithdrawFundsInternal
  } = useWagmiWriteContract();

  const {
    data: withdrawFundsReceipt,
    isLoading: isConfirmingWithdrawFunds,
    isSuccess: isWithdrawFundsConfirmed,
    error: withdrawFundsConfirmationError
  } = useWaitForTransactionReceipt({
    hash: withdrawFundsTxHash,
    query: { enabled: !!withdrawFundsTxHash }
  });

  const executeWithdrawFunds = async (args: LaunchpadOwnerActionParams) => {
    try {
      await executeWithdrawFundsInternal({
        address: args.launchpadAddress,
        abi: simpleLaunchpadAbi,
        functionName: 'withdrawFunds',
        args: [], // withdrawFunds n'a pas d'arguments
      });
    } catch (e) {
      console.error("Erreur lors de l'initiation du retrait des fonds:", e);
    }
  };

  // Hook pour withdrawUnsoldTokens
  const {
    data: withdrawTokensTxHash,
    error: withdrawTokensError,
    isPending: isWithdrawingTokens,
    writeContractAsync: executeWithdrawUnsoldTokensInternal
  } = useWagmiWriteContract();

  const {
    data: withdrawTokensReceipt,
    isLoading: isConfirmingWithdrawTokens,
    isSuccess: isWithdrawTokensConfirmed,
    error: withdrawTokensConfirmationError
  } = useWaitForTransactionReceipt({
    hash: withdrawTokensTxHash,
    query: { enabled: !!withdrawTokensTxHash }
  });

  const executeWithdrawUnsoldTokens = async (args: LaunchpadOwnerActionParams) => {
    try {
      await executeWithdrawUnsoldTokensInternal({
        address: args.launchpadAddress,
        abi: simpleLaunchpadAbi,
        functionName: 'withdrawUnsoldTokens',
        args: [], // withdrawUnsoldTokens n'a pas d'arguments
      });
    } catch (e) {
      console.error("Erreur lors de l'initiation du retrait des tokens invendus:", e);
    }
  };

  return {
    // Pour withdrawFunds
    executeWithdrawFunds,
    withdrawFundsTxHash,
    isWithdrawingFunds,
    withdrawFundsError,
    isConfirmingWithdrawFunds,
    isWithdrawFundsConfirmed,
    withdrawFundsConfirmationError,
    withdrawFundsReceipt,

    // Pour withdrawUnsoldTokens
    executeWithdrawUnsoldTokens,
    withdrawTokensTxHash,
    isWithdrawingTokens,
    withdrawTokensError,
    isConfirmingWithdrawTokens,
    isWithdrawTokensConfirmed,
    withdrawTokensConfirmationError,
    withdrawTokensReceipt,
  };
}
