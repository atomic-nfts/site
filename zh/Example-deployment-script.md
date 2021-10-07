---
title: 正式部署Atomic NFT
layout: page
lang: zh
lang-ref: Example-deployment-script
navnum: 2.4
parent: 如何部署Atomic NFT
---

# 一些建议

如何部署 Atomic NFT 示例可以查看我们的实用手册 [github repo](https://github.com/atomic-nfts/standard).

这份 repo 中包含在 `bin/` 子目录中一系列有用脚本以及在 `src/` 目录下的合约示例。

## 部署流程

想要部署 Atomic NFT，您需要有一个已有的模板合约。目前，Koii 已有三个模板可供使用：

1. 1. 标准 NFT (类似于 koi.rocks 或 Finnie 钱包预设值) - [I8xgq3361qpR8_DvqcGpkCYAUTMktyAgvkm6kGhJzEQ](https://viewblock.io/arweave/tx/I8xgq3361qpR8_DvqcGpkCYAUTMktyAgvkm6kGhJzEQ)

2. 2. Erc1155 桥接-兼容 NFT - [1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo](https://viewblock.io/arweave/tx/1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo)

3. 3. (试验) 动态 NFT - [1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo](https://viewblock.io/arweave/tx/1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo)

### 部署您自己的模板合约流程：

第一步，进入 `/CreateNFT/contracts/` 目录：

```
cd /CreateNFT/contracts/
```

第二步，查看 .env 文件，确保路径是您的 arweavewallet.json

```
WALLET_LOCATION = path/to/your/wallet
```

第三步，在/src/nft/init_state.json 文件，输入编辑您的个人信息。

准备就绪。现在开始部署模板合约：

```
yarn deploy [contract]
```

示例：

- `yarn deploy koii`
- `yarn deploy attention`

这将返回合约 ID，在下一步骤您会需要。

### 部署 Atomic NFTs

现在开始部署 Atomic NFT：

查看 creatingNewNFT.js 文件。更改为您的个人信息：

记住更改合约 ID：

```
contractSrc => [contract ID]

```

完成信息更新，即可部署：

```
node creatingNewNFT.js
```

一切就绪。仅需几分钟，您即可在 [https://viewblock.io/arweave](https://viewblock.io/arweave)搜索您的 txID。

## 部署脚本示例

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
