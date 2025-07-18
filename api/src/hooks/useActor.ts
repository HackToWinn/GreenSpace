import {
  DelegationChain,
  DelegationIdentity,
  Ed25519KeyIdentity,
} from '@dfinity/identity';
import {
  canisterId as backendCanister,
  createActor as backendActor,
} from '../declarations/backend';
import {
  canisterId as tokenCanister,
  createActor as tokenActor,
} from '../declarations/gsp_ledger';
import { Principal } from '@dfinity/principal';
import { Identity } from '@dfinity/agent';


export async function useBackend(
  identity?: Ed25519KeyIdentity,
  delegation?: DelegationChain | string
) {
  let delegationIdentity;

  if (identity && delegation) {
    const reconstructedChain =
      typeof delegation === 'string'
        ? DelegationChain.fromJSON(delegation)
        : delegation;

    const reconstructedBase =
      identity instanceof Ed25519KeyIdentity
        ? identity
        : Ed25519KeyIdentity.fromJSON(
          typeof identity === 'string' ? identity : JSON.stringify(identity)
        );

    delegationIdentity = DelegationIdentity.fromDelegation(
      reconstructedBase,
      reconstructedChain
    );
  }

  return backendActor(process.env.CANISTER_ID_BACKEND || backendCanister, {
    agentOptions: {
      host: process.env.TOKEN_AGENT_HOST || 'https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=gk3aj-aaaaa-aaaaj-a2dbq-cai',
      identity: delegationIdentity,
    },
  });
}

export async function useToken(
  identity?: Ed25519KeyIdentity,
  delegation?: DelegationChain | string,
  ownerIdentity?: Identity
) {
  let delegationIdentity;

  if (identity && delegation) {
    const reconstructedChain =
      typeof delegation === 'string'
        ? DelegationChain.fromJSON(delegation)
        : delegation;

    const reconstructedBase =
      identity instanceof Ed25519KeyIdentity
        ? identity
        : Ed25519KeyIdentity.fromJSON(
          typeof identity === 'string' ? identity : JSON.stringify(identity)
        );

    delegationIdentity = DelegationIdentity.fromDelegation(
      reconstructedBase,
      reconstructedChain
    );
  } return tokenActor(process.env.CANISTER_ID_GSP_LEDGER || tokenCanister, {
    agentOptions: {
      host: process.env.TOKEN_AGENT_HOST || 'https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=gr64m-2yaaa-aaaaj-a2dda-cai',
      identity: ownerIdentity || delegationIdentity,
    },
  });
}
