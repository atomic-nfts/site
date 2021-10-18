---
title: 余额 (required)
layout: page
lang: zh
lang-ref: Balance
navnum: 3.1
parent: Atomic NFT功能
---

# 余额

{: .fs-9 }

‘余额（balance）’方法必须包含一项函数，用于从 NFT 对象的状态中检索特定钱包的余额。

这个特点至关重要，因为对所有内部方法的掌控将取决于函数调用者是否拥有该通证的任何实例。

所有拥有者的余额会在`state.balances` 中进行跟踪，显示格式为`address: balance` ，此处`balance`为一个整数。

余额函数示例显示如下：

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

这仅仅是一个应用示例，但能够提供与现有 Atomic NFT 标准交互所需要的默认功能。
