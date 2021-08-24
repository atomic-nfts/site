---
title: Передача (обязательно)
layout: page
lang: ru
lang-ref: Transfer
navnum: 3.2
parent: Особенности атомарного NFT
---

# Transfer

{: .fs-9 }

Метод 'transfer' содержит функцию, позволяющую контракту передать ваш токен, и должен быть реализован так, чтобы работать аналогично приведенному ниже примеру.

Пример возможной функции передачи:

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

Это лишь пример реализации, но он может обеспечить функциональность по умолчанию и структуру состояний, необходимую для взаимодействия с существующими стандартами атомарных NFT.
