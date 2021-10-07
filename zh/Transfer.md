---
title: Transfer (required)
layout: page
lang: zh
lang-ref: Transfer
navnum: 3.2
parent: Features of an Atomic NFT
---

# Transfer

{: .fs-9 }

The ‘transfer’ method contains a function for allowing the contract to transfer your token and must be implemented to work similarly to the example below.

Example of a possible transfer function:

```bash
export default function transfer(state, action) {
  const input = action.input;
  const caller = action.caller;
  const target = input.target;
  ContractAssert(target, `No target specified.`);
  ContractAssert(caller !== target, `Invalid token transfer.`);
  const qty = input.qty;
  ContractAssert(qty, `No quantity specified.`);
  const balances = state.balances;
  ContractAssert(
    caller in balances && balances[caller] >= qty,
    `Caller has insufficient funds`
  );
  balances[caller] -= qty;
  if (!(target in balances)) {
    balances[target] = 0;
  }
  balances[target] += qty;
  state.balances = balances;
  return { state };
}
```

This is only an example of the implementation, but can provides the default functionality and state structure needed for interoperability with existing Atomic NFT standards.
