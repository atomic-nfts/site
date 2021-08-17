---
title: Transfer(required)
layout: page
lang: tr
lang-ref: Transfer
navnum: 3.2
parent: Atomic NFT’nin gerekli özellikleri
---

# Transfer

{: .fs-9 }

'Transfer' yöntemi, sözleşmenin Tokeninizi transfer etmesine izin veren bir işlev içerir ve aşağıdaki örneğe benzer şekilde çalışması için uygulanmalıdır.

Olası bir transfer fonksiyonu örneği:

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

Bu, sadece uygulamanın bir örneğidir. Ancak mevcut Atomik NFT standartlarıyla birlikte çalışabilmesi için gerekli varsayılan işlevselliği ve durum yapısını sağlayabilir.
