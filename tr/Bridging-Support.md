---
title: Köprüleme Desteği (isteğe bağlı)
layout: page
lang: tr
lang-ref: Bridging-Support
navnum: 3.4
parent: Atomic NFT’nin gerekli özellikleri
---

## Bridging Support

{: .fs-9 }

'Kilitle' ve 'Kilidi Aç' yöntemleri, başka bir zincire köprü oluştururken bir NFT'nin sahipliğini devretmek için gerekli olan işlevleri içerir.

## Kilitle

{: .fs-6 }

Aşağıdaki bölüm olası bir kilit işlevi örneğini göstermektedir:

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

## Kilidi aç

{: .fs-6 }

'Kilidi Aç' yöntemi, bir NFT'nin vesayetten çıkarılmasını ele alır.

Aşağıdaki bölümde olası bir kilit açma işlevi örneği gösterilmektedir:

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

Köprü uyumluluğu hakkında daha fazla bilgi almak için developers@koii.network ile iletişime geçebilirsiniz.
