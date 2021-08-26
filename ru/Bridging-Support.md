---
title: Поддержка мостов (опционально)
layout: page
lang: ru
lang-ref: Bridging-Support
navnum: 3.4
parent: Особенности атомарного NFT
---

## Поддержка мостов

{: .fs-9 }

Методы 'lock' и 'unlock' содержат функцию для передачи прав собственности на NFT при создании моста к другой цепочке.

## Lock (блокировка)

{: .fs-6 }

В приведенном ниже разделе показан пример возможной функции 'lock':

```bash
export default function lock(state, action) {
  const delegatedOwner = input.delegatedOwner;
      ContractAssert(delegatedOwner, `No target specified.`);
      const qty = input.qty;
      ContractAssert(qty && qty>0, `No valid quantity specified.`);
      const balances = state.balances;
      ContractAssert(caller in balances && balances[caller] >= qty, `Caller has insufficient funds`);
      const address=input.address
      const network=input.network
      ContractAssert(address, `No target specified.`);
      ContractAssert(network, `No network specified.`);
      balances[caller] -= qty;
      let lockedArray=state.locked
      let index=lockedArray.findIndex((e)=>{
        e.vaultAddress==delegatedOwner && e.lockedBy==caller
      })
      if(index>=0){
        lockedArray[index].amount+=qty
      }else{
        lockedArray.push({
            "UID": SmartWeave.transaction.id,
            "vaultAddress":delegatedOwner,
            "lockedBy":caller,
            "amount":qty,
            "address":address,
            "network":network
        })
      }
      state.locked=lockedArray
      return {state};
}
```

## Unlock

{: .fs-6 }

Метод 'unlock' управляет удалением NFT из-под хранения.

В разделе ниже приведен пример возможной функции 'unlock':

```bash
export default function unlock(state, action) {
  const recipientAddress = input.recipientAddress;
      ContractAssert(recipientAddress, `No target specified.`);
      let qty = input.qty;
      ContractAssert(qty && qty>0, `No valid quantity specified.`);
      let lockedArray = state.locked;
      let index=lockedArray.findIndex((e)=>{
        e.vaultAddress==caller && e.lockedBy==recipientAddress
      })
      ContractAssert(index>=0, `Only vault owner can call this function and there must be some locked NFTs under the recipient address`);
      if(lockedArray[index]-qty==0){
        lockedArray.splice(index, 1);
      }else if(lockedArray[index]-qty>0){
        lockedArray[index].qty-=qty
      }else{
        ContractAssert(lockedArray[index]-qty>=0, `You cannot unlock more qty than currently locked`);
      }
      state.locked=lockedArray
      return {state};
}

```

Для получения дополнительной информации о совместимости мостов обращайтесь по адресу developers@koii.network.
