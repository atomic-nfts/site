---
title: Deploy an Atomic NFT
layout: page
lang: en
lang-ref: Example-deployment-script
navnum: 2.4
parent: How to deploy an Atomic NFT
---

# General Tips

For an example of how to deploy an Atomic NFT, you need look no further than our handy [github repo](https://github.com/atomic-nfts/standard).

Contained in this repo, you'll find a handful of helpful scripts in the `bin/` subdirectory, along with contract examples in the `src/` directory.

## Deployment Process

In order to deploy an Atomic NFT, you first need to have an already-deployed template contract. Currently Koii has three of these available:

1. Standard NFT (similar to koi.rocks or Finnie wallet defaults) - [r_ibeOTHJW8McJvivPJjHxjMwkYfAKRjs-LjAeaBcLc](https://viewblock.io/arweave/tx/r_ibeOTHJW8McJvivPJjHxjMwkYfAKRjs-LjAeaBcLc)

2. Erc1155 Bridge-Compatible NFT - [1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo](https://viewblock.io/arweave/tx/1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo)

3. _(Experimental)_ Dynamic NFT - [1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo](https://viewblock.io/arweave/tx/1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo)

### Deploy the Atomic NFTs

Now let's deploy the Atomic NFT:

Check the creatingNewNFT.js file. Change the info to your own:

Select your Contract-src:

Default is `r_ibeOTHJW8McJvivPJjHxjMwkYfAKRjs-LjAeaBcLc`. If you only want to deploy the Atomic NFT you DO NOT need to change the info. If you want to create a new contract and use it, please see the tutorial below.

```
Line 63: tx.addTag('Contract-Src', 'r_ibeOTHJW8McJvivPJjHxjMwkYfAKRjs-LjAeaBcLc'); // or select your contract id.

```

Change your `arweavewallet.json` path:

```
line 44: let wallet = JSON.parse(fs.readFileSync("path/to/your/wallet","utf-8"));
```

Change your image path:

```
line 22: 'https://i0.hdslb.com/bfs/album/94731fefec0d6b1b9f0ab17bb97f66466d7e3886.png' // paste your image url here
```

Change init_state: line 25 - line 40:

```
"title": "",
    "name": "",
    "description": "",
    "ticker": "KOINFT",
    "balances": {
      "<Wallet address>": 1
    },
    "owners": {
      "1": "<wallet address>"
    },
    "maxSupply": 5,
    "locked": [],
    "contentType": "image/png",
    "createdAt": "1624057295",
    "tags": [
      ""
```

After the info is finished, deploy it:

```
node creatingNewNFT.js
```

You're all done, Just a few minutes you could search your txID on [https://viewblock.io/arweave](https://viewblock.io/arweave)

### Here's how can you deploy your own teplate contract:

(Notice: Deploy contract is not necessary)

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
yarn deploy nft
```

Notice:

If you want to create some new rules for the contract:

- Create a new folder in src, give it a nice name
- Copy & Paste files in `nft` folder
- Customize your own rules in `index.js`

Then, when you want to deploy your customized contract, run `yarn deploy [your folder name]`

Examples:

- `yarn deploy nft`
- `yarn deploy attention`

This will return a contract ID, which you'll need in deploy atomic NFT.

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
