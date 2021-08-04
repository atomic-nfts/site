---
layout: default
slideId: Example-deployment-script
title: Example deployment script
parent: How to deploy an Atomic NFT
nav_order: 3
---

# Example deployment script

<br>

This one was founded at [here](https://cedriking.medium.com/lets-buidl-smartweave-contracts-6353d22c4561){:target = "_blank"}.


```bash

import Arweave from 'arweave';
const arweave = Arweave.init({
    host: 'arweave.net',
    protocol: 'https',
    port: 443
});
async function createContract() {
    // Let's first create the contract transaction.
    const contractTx = await arweave.createTransaction({ data: contractSource }, wallet);
    contractTx.addTag('App-Name', 'SmartWeaveContractSource');
    contractTx.addTag('App-Version', '0.3.0');
    contractTx.addTag('Content-Type', 'application/javascript');
    
    // Sign
    await arweave.transactions.sign(contractTx, wallet);
    // Let's keep the ID, it will be used in the state transaction.
    const contractSourceTxId = contractTx.id;
    
    // Deploy the contract source
    await arweave.transactions.post(contractTx);
    
    // Now, let's create the Initial State transaction
    const initialStateTx = await arweave.createTransaction({ data: initialState }, wallet);
    initialState.addTag('App-Name', 'SmartWeaveContract');
    initialState.addTag('App-Version', '0.3.0');
    initialState.addTag('Contract-Src', contractSourceTxId);
    initialState.addTag('Content-Type', 'application/json');
    
    // Sign
    await arweave.transactions.sign(initialState, wallet);
    const initialStateTxId = initialState.id;
    // Deploy
    await arweave.transactions.post(initialState);
}
createContract();

```