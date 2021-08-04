---
layout: default
slideId: Balance
title: Balance
parent: Required features of an atomic NFT
nav_order: 1
---
## Balance 
{: .fs-9 }


The 'balance' method contains a function for retrieving the balance of a specific wallet from the state of the NFT object.

The section below shows an example of a possible balance function:

```bash
export default function balance(state, action) {
  const input = action.input;
  const caller = action.caller;
  let target;
  if (input.target) {
    target = input.target;
  } else {
    target = caller;
  }
  const ticker = state.ticker;
  const balances = state.balances;
  ContractAssert(
    typeof target === "string",
    `Must specify target to retrieve balance for.`
  );
  return {
    result: {
      target,
      ticker,
      balance: target in balances ? balances[target] : 0
    }
  };
}
```

This is only an example of the implementation, but can provides the default functionality needed for interoperability with existing Atomic NFT standards.