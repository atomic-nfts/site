---
layout: default
slideId: Bridging-Support 
title: Bridging Support (optional)
parent: Features of an Atomic NFT
nav_order: 6
---

## Bridging Support
{: .fs-9 }

The 'lock' and 'unlock' methods contain the function for delegating ownership of an NFT when bridging to another chain. 

## Lock 
{: .fs-6 }

The section below shows an example of a possible 'lock' function:

```bash
export default function lock(state, action) {
  const input = action.input;
  const caller = action.caller;
  const delegatedOwner = input.delegatedOwner;
  ContractAssert(delegatedOwner, `No target specified.`);
  const qty = input.qty;
  ContractAssert(qty, `No quantity specified.`);
  const balances = state.balances;
  ContractAssert(
    caller in balances && balances[caller] >= qty,
    `Caller has insufficient funds`
  );
  balances[caller] -= qty;
  if (!(delegatedOwner in balances)) {
    balances[delegatedOwner] = 0;
  }
  balances[delegatedOwner] += qty;

  const ethOwnerAddress = input.ethOwnerAddress;
  ContractAssert(ethOwnerAddress, `No ethereum address specified.`);
  state.ethOwnerAddress = ethOwnerAddress;
  return { state };
}
```

## Unlock 
{: .fs-6 }

The 'unlock' method handles removing an NFT from custodianship.

The section below shows an example of a possible 'unlock' function:

```bash
export default function unlock(state, action) {
  const input = action.input;
  const balances = state.balances;
  const addresses = Object.keys(balances);
  for (const address of addresses) {
    delete balances[address];
  }

  const qty = input.qty;
  ContractAssert(qty, `No quantity specified.`);
  const arweaveAddress = input.arweaveAddress;
  ContractAssert(arweaveAddress, `No arweaveAddress specified.`);
  if (!(arweaveAddress in balances)) {
    balances[arweaveAddress] = 0;
  }
  balances[arweaveAddress] += qty;
  delete state.ethOwnerAddress;

  return { state };
}

```

For more information about bridge compatibility, contact developers@koii.network.
