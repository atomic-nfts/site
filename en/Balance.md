---
title: Balance(required)
layout: page
lang: en
lang-ref: Balance
navnum: 3.1
parent: Features of an Atomic NFT
---

# Balance

{: .fs-9 }

The ‘balance’ method must contain a function for retrieving the balance of a specific wallet from the state of the NFT object.

This is a crucial feature, as the control of all internal methods will depend on whether the function caller owns any instances of the token.

The balances of all owners are tracked in `state.balances` in the format of `address: balance` where `balance` is an integer.

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
