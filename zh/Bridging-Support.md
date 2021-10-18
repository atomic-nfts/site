---
title: 桥接支持 (可选)
layout: page
lang: zh
lang-ref: Bridging-Support
navnum: 3.4
parent: Atomic NFT功能
---

## 桥接支持

{: .fs-9 }

‘锁定（lock）’和‘解锁（unlock）’方法中包含一个函数，用以桥接到另一条区块链时委托 NFT 所有权。

## Lock 锁定

{: .fs-6 }

‘lock’函数示例如下：

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

## Unlock 解锁

{: .fs-6 }

解锁（unlock）’方法处理从托管中移除 NFT。

‘解锁（unlock）’方法示例如下：

```bash
// Only the vault owner can call this function
  if (input.function === "unlock") {
    const recipientAddress = input.recipientAddress;
    ContractAssert(recipientAddress, `No target specified.`);
    let qty = input.qty;
    ContractAssert(qty && qty > 0, `No valid quantity specified.`);
    let lockedArray = state.locked;
    let index = lockedArray.findIndex((e) => {
      return e.vaultAddress == caller && e.lockedBy == recipientAddress;
    });
    ContractAssert(
      index >= 0,
      `Only vault owner can call this function and there must be some locked NFTs under the recipient address`
    );
    if (lockedArray[index].amount - qty == 0) {
      lockedArray.splice(index, 1);
      state.balances[recipientAddress] =
        Number(state.balances[recipientAddress]) + qty;
    } else if (lockedArray[index].amount - qty > 0) {
      lockedArray[index].amount -= qty;
      state.balances[recipientAddress] =
        Number(state.balances[recipientAddress]) + qty;
    } else {
      ContractAssert(
        lockedArray[index].amount - qty >= 0,
        `You cannot unlock more qty than currently locked`
      );
    }
    state.locked = lockedArray;
    return { state };
  }

```

更多关于桥接可兼容性，请联系：developers@koii.network。
