---
title: Bridging Support (optional)
layout: page
lang: zh
lang-ref: Bridging-Support
navnum: 3.4
parent: Features of an Atomic NFT
---

## Bridging Support

{: .fs-9 }

The ‘lock’ and ‘unlock’ methods contain the function for delegating ownership of an NFT when bridging to another chain.

## Lock

{: .fs-6 }

The section below shows an example of a possible ‘lock’ function:

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

The ‘unlock’ method handles removing an NFT from custodianship.

The section below shows an example of a possible ‘unlock’ function:

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

For more information about bridge compatibility, contact developers@koii.network.
