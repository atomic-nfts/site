---
layout: default
slideId: Example-deployment-script
title: Deploy an Atomic NFT
parent: How to deploy an Atomic NFT
nav_order: 3
---

# General Tips
For an example of how to deploy an Atomic NFT, you need look no further than our handy [github repo](https://github.com/atomic-nfts/standard).

Contained in this repo, you'll find a handful of helpful scripts in the `bin/` subdirectory, along with contract examples in the `src/` directory. 

## Deployment Process
In order to deploy an Atomic NFT, you first need to have an already-deployed template contract. Currently Koii has three of these available:

1. Standard NFT (similar to koi.rocks or Finnie wallet defaults) - [I8xgq3361qpR8_DvqcGpkCYAUTMktyAgvkm6kGhJzEQ](https://viewblock.io/arweave/tx/I8xgq3361qpR8_DvqcGpkCYAUTMktyAgvkm6kGhJzEQ)

2. Erc1155 Bridge-Compatible NFT - [1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo](https://viewblock.io/arweave/tx/1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo)

3. *(Experimental)* Dynamic NFT - [1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo](https://viewblock.io/arweave/tx/1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo)


### Here's how can you deploy your own teplate contract:

First, enter the `/CreateNFT/contracts/` directory:

```
cd /CreateNFT/contracts/
```

Second, check the .env file, make sure the path is your arweavewallet.json

```
WALLET_LOCATION = path/to/your/wallet
```

Third, in /src/nft/init_state.json file, edit this to your info.

You're all set, now let's deploy the template contracts:

```
yarn deploy [contract]
```

Examples:

- `yarn deploy koii`
- `yarn deploy attention`

This will return a contract ID, which you'll need in the next step.

###  Deploy the Atomic NFTs

Now let's deploy the Atomic NFT:

Check the creatingNewNFT.js file. Change the info to your own:

Remember to change the contract ID:

```
contractSrc => [contract ID]

```

After the info is finished, deploy it:

```
node creatingNewNFT.js
```

You're all done, Just a few minutes you could search your txID on [https://viewblock.io/arweave](https://viewblock.io/arweave)


## Example Deployment Script
<br>

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