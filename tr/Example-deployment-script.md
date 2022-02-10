---
title: Atomik NFT dağıtın
layout: page
lang: tr
lang-ref: Example-deployment-script
navnum: 2.3
parent: Atomic NFT nasıl dağıtılır
---

# Genel ipuçları

Bir Atomik NFT'nin nasıl dağıtılacağına dair bir örnek için, kullanışlı [github repo](https://github.com/atomic-nfts/standard) depomuza bakabilirsiniz.

Bu depoda yer alan `bin/` alt dizinde, dizindeki sözleşme örnekleriyle birlikte bir kısım yardımcı komut dosyası bulacaksınız `src/`.

## Dağıtım Süreci

Bir Atomic NFT'yi dağıtmak için önce önceden dağıtılmış bir şablon sözleşmeniz olması gerekir. Şu anda Koii'de bunlardan üç tanesi mevcut:

1. Standart NFT (koi.rocks veya Finnie cüzdan varsayılanlarına benzer) - [r_ibeOTHJW8McJvivPJjHxjMwkYfAKRjs-LjAeaBcLc](https://viewblock.io/arweave/tx/r_ibeOTHJW8McJvivPJjHxjMwkYfAKRjs-LjAeaBcLc)

2. Erc1155 Köprü Uyumlu NFT - [1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo](https://viewblock.io/arweave/tx/1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo)

3. _(Deneysel)_ Dinamik NFT- [1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo](https://viewblock.io/arweave/tx/1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo)

### Kendi sözleşmenizi şu şekilde dağıtabilirsiniz:

İlk önce `/CreateNFT/contracts/` dizine girin :

```
cd /CreateNFT/contracts/
```

İkinci olarak, .env dosyasını kontrol edin, path’in sizin arweavewallet.json'unuz olduğundan emin olun.

```
WALLET_LOCATION = path/to/your/wallet
```

Üçüncüsü, in /src/nft/init_state.json dosyasında bunu kendi bilgilerinize göre düzenleyin.

Hazırsanız, şimdi şablon sözleşmeleri dağıtalım:

```
yarn deploy [contract]
```

Örnekler:

- `yarn deploy koii`
- `yarn deploy attention`

Bu, bir sonraki adımda ihtiyaç duyacağınız bir sözleşme kimliği oluşturur.

### Atomik NFT'leri dağıtın

Şimdi Atomik NFT'yi nasıl dağıtacağımızı görelim:

creatingNewNFT.js file. dosyasını kontrol edin. Bilgileri kendinize göre değiştirin:

Sözleşme kimliğini değiştirmeyi unutmayın:

```
contractSrc => [contract ID]

```

Tamamladıktan sonra dağıtın:

```
yarn
node creatingNewNFT.js
```

Her şey bitti, sadece birkaç dakika içinde [https://viewblock.io/arweave](https://viewblock.io/arweave) adresinde txID'nizi arayabilirsiniz.

## Örnek Dağıtım Komut Dosyası

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
