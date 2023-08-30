---
pre: <b>1. </b>
title: Token transaction list api
weight: 300
---

Now, let's finally develop a service using ChainQuery. ChainQuery has a ListTokenBalances API that lists the Bitcoin and Ethereum assets and tokens an individual owns. ( API supports ERC-20,ERC-721,ERC-1155 tokens. ) We'll use this API to get the assets of Vitalik, the creator of Ethereum, and Satoshi, the creator of Bitcoin, as well as create an API to get the assets of an individual and test API.

List the token transaction list for specific address(Bitcoin,Ethereum,ERC-20,ERC-721,ERC-1155).


### 1. token transaction list query on console

We can use the Query transaction list token function for specific address on console.

### 2. token transaction list query by api

Call the API gateway and check the result by using pre-made lamda functon which is connected to API gateway and consist of the Query API.


### 3. token transaction list query on web3 wallet

Call the token transaction list api(API gateway url) for specific address on the web3 wallet App.
