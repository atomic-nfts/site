---
title: Tags explanation
layout: page
lang: en
lang-ref: Tags-explanation
navnum: 2.5
parent: How to deploy an Atomic NFT
---

# Tags explanation

When you deploy the Atomic NFT, you might notice there are several tags.

![Tags](/assets/images/tags.png)

After you deploy the Atomic NFT, it looks like this on block:

![Tags-block](/assets/images/tags-block.png)

Here are the explanation of these tags:

### Content-Type

This indicates is the type of the content you are uploading. For example a png image NFT will have the content type image/png, for html page it would be text/html

### Network

`Netowrk`is something which we keep `Koi` to keep track

### Action, App-Name and App-Version

Please DO NOT change these tags. These tags will make sure you can deploy the NFT successfully.

### Contract-Src

On last step after you deploy the contract you will get a contract ID. This one should be change to the contract source(ID) code.

### Init-State

This one will contain the information that you changed in ` initialState`

- owner: this one should be your wallet address. You can find it in your Finnie Wallet(Get your wallet [here](https://chrome.google.com/webstore/detail/finnie/cjmkndjhnagcfbpiemnkdpomccnjblmj))
- title: your title here
- description: your description here
- ...

You can put any tag you like in `initialState`.
