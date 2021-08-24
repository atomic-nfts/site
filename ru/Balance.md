---
title: Баланс (требуется)
layout: page
lang: ru
lang-ref: Balance
navnum: 3.1
parent: Особенности атомарного NFT
---

# Balance

{: .fs-9 }

Метод 'balance' должен содержать функцию для получения баланса конкретного кошелька из состояния объекта NFT.

Это очень важная функция, так как управление всеми внутренними методами будет зависеть от того, владеет ли вызывающая функция какими-либо экземплярами токена.

Балансы всех владельцев отслеживаются в файле `state.balances` в формате `address: balance`, где `balance` - целое число.

В приведенном ниже разделе показан пример возможной функции баланса:

``bash
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
    `Необходимо указать цель для получения баланса.`
  );
  return {
    result: {
      цель,
      тикер,
      balance: target in balances ? balances[target] : 0
    }
  };
}
```

Это лишь пример реализации, но он может обеспечить функциональность по умолчанию, необходимую для взаимодействия с существующими стандартами Атомарного NFT.
