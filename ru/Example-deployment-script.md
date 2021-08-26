---
title: Пример скрипта для развертывания атомарного NFT
layout: page
lang: ru
lang-ref: Example-deployment-script
navnum: 2.3
parent: Пример скрипта для развертывания атомарного NFT
---

# Общие советы

Для получения примера того, как развернуть Atomic NFT, вам нужно обратиться к нашему порталу [github repo](https://github.com/atomic-nfts/standard).

В этом репозитории вы найдете несколько полезных скриптов в подкаталоге `bin/`, а также примеры контрактов в каталоге `src/`.

## Процесс развертывания

Для того чтобы развернуть атомарный NFT, вам сначала нужно иметь уже развернутый шаблонный контракт. В настоящее время в Koii доступны три таких контракта:

1. Стандартный NFT (аналогичный koi.rocks или Finnie wallet defaults) - [I8xgq3361qpR8_DvqcGpkCYAUTMktyAgvkm6kGhJzEQ](https://viewblock.io/arweave/tx/I8xgq3361qpR8_DvqcGpkCYAUTMktyAgvkm6kGhJzEQ)

2. Erc1155 Мост-совместимый NFT - [1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo](https://viewblock.io/arweave/tx/1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo)

3. _(Экспериментальный)_ Динамический NFT - [1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo](https://viewblock.io/arweave/tx/1ZjIecqKGYdGTFMWR9kdGrmi77lMmZnA6dxEzWulyjo)

### Вот как вы можете развернуть свой собственный контракт платформы:

Для начала войдите в директорию `/CreateNFT/contracts/`:

```
cd /CreateNFT/contracts/
```

Затем проверьте файл .env, убедитесь, что путь - ваш arweavewallet.json

```
WALLET_LOCATION = path/to/your/wallet
```

В-третьих, в файле /src/nft/init_state.json отредактируйте это под вашу информацию.

Все готово, теперь давайте развернем шаблон контрактов:

```
yarn deploy [contract]
```

Примеры:

- ``yarn deploy koii``
- `yarn deploy attention`.

Это вернет идентификатор контракта, который понадобится вам на следующем шаге.

### Развертывание атомарных NFT

Теперь давайте развернем атомарный NFT:

Проверьте файл creatingNewNFT.js. Измените информацию на свою собственную:

Не забудьте изменить ID контракта:

```
contractSrc => [ID контракта]

```

После того, как информация будет готова, разверните его:

```
node creatingNewNFT.js
```

Все готово, через несколько минут вы сможете найти свой txID на [https://viewblock.io/arweave](https://viewblock.io/arweave)

## Пример сценария развертывания

<br>

```bash

import Arweave from 'arweave';
const arweave = Arweave.init({
    host: 'arweave.net',
    protocol: 'https',
    port: 443
});
async function createContract() {
    // Сначала создадим транзакцию контракта.
    const contractTx = await arweave.createTransaction({ data: contractSource }, wallet);
    contractTx.addTag('App-Name', 'SmartWeaveContractSource');
    contractTx.addTag('App-Version', '0.3.0');
    contractTx.addTag('Content-Type', 'application/javascript');

    // Подписание
    await arweave.transactions.sign(contractTx, wallet);
    // Сохраним ID, он будет использоваться в статусу транзакции.
    const contractSourceTxId = contractTx.id;

    // Развертывание источника контракта
    await arweave.transactions.post(contractTx);

    // Теперь создадим транзакцию начального состояния
    const initialStateTx = await arweave.createTransaction({ data: initialState }, wallet);
    initialState.addTag('App-Name', 'SmartWeaveContract');
    initialState.addTag('App-Version', '0.3.0');
    initialState.addTag('Contract-Src', contractSourceTxId);
    initialState.addTag('Content-Type', 'application/json');

    // Подписание
    await arweave.transactions.sign(initialState, wallet);
    const initialStateTxId = initialState.id;
    // Развертывание
    await arweave.transactions.post(initialState);
}
createContract();

```
