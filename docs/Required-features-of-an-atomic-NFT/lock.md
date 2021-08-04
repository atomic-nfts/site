---
layout: default
slideId: lock
title: Lock
parent: Required features of an atomic NFT
nav_order: 3
---

## Lock 
{: .fs-9 }


The 'Lock' method contains a function for 

The section below shows an example of a possible lock function:

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

This is only an example of the implementation, but can provides the default functionality needed for interoperability with existing Atomic NFT standards.