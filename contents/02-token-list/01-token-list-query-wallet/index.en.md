---
pre: <b>1. </b>
title: Token list query wallet
weight: 201
---

The purpose of this phase is to see how AMB query can operate in the wallet App.
We already deploy the API have been made by the lambda using AMB Query APIs.
Using these developed APIs, We can see the operations of AMB Query.

First Step is getting token lists from the user's address.
We can set up the env file that includes the wallet addresses and API addresses and server.
The file configuration is in below.

### 1. Setup the .env configureation.

We can setup the addresses of the three users who are Satoshi, Vitalick, Peccy.
If you test the address that you know, You can substitute the address in the env file.
But you can not change the user's name.

![Main front window](/contents/static/02-token-list/02-token-list-query-wallet/env-setup.png)

And you should change the REACT_APP_API_ADDR to API Gateway address that you already created by cdk.

### 1. Go to the Customer List and Choose the User

Call the API gateway and check the result by using pre-made lamda functon which is connected to API gateway and consist of the Query API.


### 2. Checking the balances of cyptocurrency in wallet.

Call the token list api(API gateway url) on the web3 wallet App.

### 3. Checking the Digital assets.

Call the token list api(API gateway url) on the web3 wallet App.
