---
layout: default
slideId: unlock
title: Unlock
parent: Required features of an atomic NFT
nav_order: 3
---

## Unlock 
{: .fs-9 }


The 'Unlock' method contains a function for 

The section below shows an example of a possible lock function:

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

This is only an example of the implementation, but can provides the default functionality needed for interoperability with existing Atomic NFT standards.