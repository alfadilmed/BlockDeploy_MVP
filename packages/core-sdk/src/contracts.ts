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
  // decimals: number; // Les décimales sont souvent fixées dans le contrat, mais si le bytecode l'attend, ajoutez ici.
  contractAbi: Abi;
  contractBytecode: `0x${string}`;
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
        args: [args.name, args.symbol, args.initialSupply], // Arguments du constructeur
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
