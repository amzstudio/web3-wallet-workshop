---
pre: <b>1. </b>
title: Token list api
weight: 200
---


Now, let's finally develop a service using ChainQuery. ChainQuery has a ListTokenBalances API that lists the Bitcoin and Ethereum assets and tokens an individual owns. ( API supports ERC-20,ERC-721,ERC-1155 tokens. ) We'll use this API to get the assets of Vitalik, the creator of Ethereum, and Satoshi, the creator of Bitcoin, as well as create an API to get the assets of an individual and test API.


### 1. Go to [Lambda Console](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/) and find the Function whose names starts with **"Web3WalletBackendStack"**.Click the function.

![](/contents/static/02-token-list/00-token-list-query-api/find_function.png)

### 2. In the code, you can see **# start #** word on line 79. In this workshop, we will make our wallet by uncommenting the parts commented below one by one. 

![](/contents/static/02-token-list/00-token-list-query-api/all_services.png)

### 3. First, uncomment step0 and step1 and remove the pass command. When you're done, it should look like the image below.

![](/contents/static/02-token-list/00-token-list-query-api/token_list_api_uncomment.png)

### 4. Deploy Lambda function.

![](/contents/static/02-token-list/00-token-list-query-api/lambda_deploy.png)

### 5. Before Testing the Lambda, Let's see how to build for token_list service. First, let's find and look through the step0_get_token_balance function. With this function, we can get Ethereum/Bitcoin balance (but not for Ethereum tokens)

![](/contents/static/02-token-list/00-token-list-query-api/step0_function.png)


If you look at the function, it takes multiple addresses as parameters and separates them by the '&' sign so that it can handle more than one address. 

```bash
address_list = path_params["address"].split("&")
```

Then _get_token_identifier_by_address function determines whether the address is an Ethereum or Bitcoin address and sets the appropriate value. 
(For Ethereum, put eth in the tokenIdentifier parameter and btc for Bitcoin. If you do not use this tokenIdentifer parameter, you can get other Ethereum tokens.) 

```bash
def _is_ethereum_address(address):
    return True if address.startswith('0x') else False

def _get_token_identifier_by_address(address):
    return TOKEN_IDENTIFIER_MAINNET.get('eth') if _is_ethereum_address(address) else TOKEN_IDENTIFIER_MAINNET.get('btc')
    ...
    tokenIdentifier = _get_token_identifier_by_address(address),
```

The service works differently for single and multiple addresses: for single addresses, it uses AMB Query's get_token_balance API,

```bash
    balance = query.get_token_balance(
        tokenIdentifier = _get_token_identifier_by_address(address),
        ownerIdentifier = {"address": address},
    )
```

and for multiple addresses, it uses the batch_get_token_balance API. The parameter value allows you to send more than one address at the same time. 

```bash
            req.append(
                {
                    'tokenIdentifier': _get_token_identifier_by_address(address),
                    'ownerIdentifier': {
                        'address': address
                    }
                }
            )
                    
        response = query.batch_get_token_balance(getTokenBalanceInputs=req)
```

### 6. Now we go to [API Gateway](https://us-east-1.console.aws.amazon.com/apigateway/home?region=us-east-1#/apis) and click APIs named **Wallet**. 

![](/contents/static/02-token-list/00-token-list-query-api/wallet_api.png)

### 7. From the SideMenu Bar, click **Resources**. Then 4 APIs will be appeared. Select **step0** and **GET** method. Click **Test** Button. 

![](/contents/static/02-token-list/00-token-list-query-api/step0_test.png)

### 8. Initially, we'll test with Satoshi's address just for fun. He's the creator of Bitcoin and many people are sending him Bitcoins, and we'll see how much he has. Put **satoshi** value to **Path** parameter. You can see the result below. 

![](/contents/static/02-token-list/00-token-list-query-api/step0_test_satoshi.png)

![](/contents/static/02-token-list/00-token-list-query-api/step0_test_satoshi_result.png)

### 9. If you do the same thing with Vitalik, you can put **vitalik** value. 

![](/contents/static/02-token-list/00-token-list-query-api/step0_test_vitalik.png)

### 10. Now we are testing with a person's Bitcoin and Ethereum addresses. We will use addresses below

```bash
Ethereum address : 0x188B264AA1456B869C3a92eeeD32117EbB835f47
Bitcoin address : 1MZX6ExdDzWefGbD6Dc4bShdBRoNA3ijLF
```

### 11. We have already looked through the step0 function. If we have more than one address, we use '&' sign to get all the values from different Network. So now we put **0x188B264AA1456B869C3a92eeeD32117EbB835f47&1MZX6ExdDzWefGbD6Dc4bShdBRoNA3ijLF** value to **Path** parameter. 

![](/contents/static/02-token-list/00-token-list-query-api/step0_test_two_addresses.png)

### 12. Can you see the difference in the result? The result has two balances - Bitcoin and Ethereum. 

![](/contents/static/02-token-list/00-token-list-query-api/step0_test_multi_result.png)


### 13. Move to [Lambda Console](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/) and select Function whose names starts with **"Web3WalletBackendStack"**. We will now see step1. 

### 14. Find the step1_list_token_balances function in the Lambda code.

![](/contents/static/02-token-list/00-token-list-query-api/step1_function_code.png)

### 15. Step0 function does not have tokens list, only Ethereum or Bitcoin themselves. But by using Step1 function, Tokens list (ERC-20,ERC-721,ERC-1155) can be uncovered. We use **list_token_balances** API to get values.

What's interesting about this API is that it does some pagination that would normally have to be implemented at the service level. The maxResults value allows you to specify how many values you want to get, and the values are accompanied with a nextToken value (which we'll look at later), which allows you to move on to the next values. In this session, we will set default maxResults as 10. 

```bash

DEFAULT_MAX_RESULTS = 10
    ...
    arguments = {
        'tokenFilter': {'network': network},
        'ownerFilter': {"address": address},
        'maxResults': maxResults,
    }

```

NextToken parameter is optional. 

```bash

    if query_params is not None and "nextToken" in query_params and query_params['nextToken'] is not None and query_params['nextToken'] != '':
        arguments["nextToken"] = query_params["nextToken"]

```

### 16. Go to [API Gateway](https://us-east-1.console.aws.amazon.com/apigateway/home?region=us-east-1#/apis) and click APIs named **Wallet**. From the SideMenu Bar, click **Resources**. Select **step1** and **GET** method. Click **Test** Button. 

![](/contents/static/02-token-list/00-token-list-query-api/step1_test.png)

### 17. Put **0x188B264AA1456B869C3a92eeeD32117EbB835f47** value to **Path** parameter. And click **Test** button.

![](/contents/static/02-token-list/00-token-list-query-api/step1_test_eth.png)

![](/contents/static/02-token-list/00-token-list-query-api/step_1_test_result_first.png)

### 18. The result now includes tokens, but it's a lot so it's hard to see it all at once. In this case, maxResults parameter will be helpful. Put **maxResults=3** value to **Query Strings** parameter.

![](/contents/static/02-token-list/00-token-list-query-api/step1_test_with_max.png)

![](/contents/static/02-token-list/00-token-list-query-api/step1_test_result_max.png)

### 19. In the result, you can see **nextToken** value. Copy this value and add parameter to Query Strings. The Query Strings will be like this - **maxResults=3&nextToken=YourNextTokenValue**. Then you can see next values.

![](/contents/static/02-token-list/00-token-list-query-api/step1_test_with_result_next.png)

![](/contents/static/02-token-list/00-token-list-query-api/step1_test_next.png)

