---
title: 转账 (必要)
layout: page
lang: zh
lang-ref: Transfer
navnum: 3.2
parent: Atomic NFT功能
---

# 转账（transfer）

{: .fs-9 }

‘转账（transfer）’方法包含一个函数，用于允许合约来转账您的代币，且必须与下列示例类似的方式来执行。

转账函数示例：

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

这仅仅是一个应用示例，但能够提供与现有 Atomic NFT 标准交互所需要的默认功能和状态结构。
