---
title: Bakiye(required)
layout: page
lang: tr
lang-ref: Balance
navnum: 3.1
parent: Atomic NFT’nin gerekli özellikleri
---

# Bakiye

{: .fs-9 }

"Bakiye" yöntemi, belirli bir cüzdanın bakiyesini NFT nesnesinin durumundan almak için bir işlev içermelidir.

Bu çok önemli bir özelliktir, çünkü tüm dahili yöntemlerin kontrolü, işlev çağırıcısının belirtecin herhangi bir örneğine sahip olup olmadığına bağlı olacaktır.

Tüm kişilerin bakiyeleri `state.balances` içinde adres formatında izlenir: bakiyenin bir tamsayı olduğu bakiye şeklinde.

Aşağıdaki bölüm olası bir bakiye fonksiyonu örneğini göstermektedir:

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

Bu, sadece uygulamanın bir örneğidir. Ancak mevcut Atomik NFT standartlarıyla birlikte çalışabilmesi için gerekli varsayılan işlevselliği sağlayabilir.
