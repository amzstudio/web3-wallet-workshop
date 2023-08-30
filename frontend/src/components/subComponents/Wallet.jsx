import '../../css/main.css'
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

import satoshi from '../jsonsample/satoshibalance.json';


const headers = {

  "Access-Control-Allow-Origin": process.env.REACT_APP_URL,
  "Access-Control-Allow-Credentials":"true"
}; 


const ADDRESS1 = process.env.REACT_APP_ADDRESS1;
const ADDRESS2 = process.env.REACT_APP_ADDRESS2;
const ADDRESS3 = process.env.REACT_APP_ADDRESS3;
const ADDRESS4 = process.env.REACT_APP_ADDRESS4;
const API_ADDR = process.env.REACT_APP_API_ADDR+'/step0/';



function delay() {
  return new Promise(resolve => setTimeout(resolve, 300));
}



export default function Wallet() {

  function tokenList(){
    if(posts["tokenBalances"][0]["tokenIdentifier"]["network"].replace('_MAINNET','')=='BITCOIN' && Object.keys(posts["tokenBalances"]).length==1 ){
      alert("There is no tokens");
    }else if(posts["tokenBalances"][0]["tokenIdentifier"]["network"].replace('_MAINNET','')=='ETHEREUM'){
      navigate('/TokenList',{state:{crypto:posts["tokenBalances"][0]["tokenIdentifier"]["network"].replace('_MAINNET',''), value :posts["tokenBalances"][0]["balance"],user_name:user_name,address:posts["tokenBalances"][0]["ownerIdentifier"]["address"]}})
    }else{
      navigate('/TokenList',{state:{crypto:posts["tokenBalances"][1]["tokenIdentifier"]["network"].replace('_MAINNET',''), value :posts["tokenBalances"][1]["balance"],user_name:user_name,address:posts["tokenBalances"][1]["ownerIdentifier"]["address"]}})
    }
  }

  const [posts, setPosts] = useState([]);

  //const [crypto_list, setCryptolist] = useState([]);
  //const [crypto_value, setCryptovalue] = useState([]);
  //const [crypto_symbol, setCryptosymbol] = useState([]);
  const [ADDRESS, setAddress] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const user_name = location.state.user_name;

  /*
  if(user_name ==='Satoshi'){
     setAddress(ADDRESS1);
  }else if(user_name ==='Vitalik'){
     setAddress(ADDRESS2);
  }else{
     setAddress(ADDRESS3+'&'+ADDRESS4)
  }
  */
  console.log(ADDRESS);

  useEffect(() => {
    if (user_name === 'Satoshi') {
      setAddress(ADDRESS1);
    } else if (user_name === 'Vitalik') {
      setAddress(ADDRESS2);
    } else {
      setAddress(ADDRESS3 + '&' + ADDRESS4)
    }
    const getPosts = async () => {
      const result = await axios.get(
        API_ADDR + ADDRESS, { headers }
      );
      console.log("call");
      await delay();

      setPosts(result.data);

    };
    getPosts();
  }, [API_ADDR + ADDRESS]);



  if (posts["tokenBalances"] === undefined) {
    console.log("undefined");

  } else {
    console.log("defined");
    console.log(posts["tokenBalances"]);
    console.log(Object.keys(posts["tokenBalances"]).length);
    console.log([posts["tokenBalances"][0]["tokenIdentifier"]["network"].replace('_MAINNET', '')])
  }
  return (
    <div>
      <div class="mobile_bg">
        <div class="space"></div>
        <div class={"top_user_" + user_name + "_picture"}></div>
        <span class="top_user_name">{user_name}</span>
        <div class="space"></div>

        <span style={{ top: '172px' }} class="list-subject">Asset</span>

        {(() => {


            <><span style="hidden"></span></>
            let top = 200;
            if(posts["tokenBalances"] === undefined){
                return null;
            }else{
                return posts["tokenBalances"].map((cryptObj,index) => <>
                      <div style={{top: top+2+'px'}}class="asset_line"></div>
                      <div style={{top: top+12+'px'}}  class="crypto_box"
                      onClick={() => navigate('/TransactionStatus',{state:{crypto:cryptObj["tokenIdentifier"]["network"].replace('_MAINNET',''), value :cryptObj["balance"],user_name:user_name,address:cryptObj["ownerIdentifier"]["address"]}})}
                      ></div>
                      <span style={{top: top+33+'px'}} class="crypto_name">{cryptObj["tokenIdentifier"]["network"].replace('_MAINNET','')}</span>
                      <span style={{top: top+73+'px'}} class="crypto_val">{cryptObj["balance"]}&nbsp;{cryptObj["tokenIdentifier"]["tokenId"].toUpperCase()}</span>
                      <div style={{top: top+33+'px'}} class={cryptObj["tokenIdentifier"]["network"].replace('_MAINNET','')}   
                      onClick={() => navigate('/TransactionStatus',{state:{crypto:cryptObj["tokenIdentifier"]["network"].replace('_MAINNET',''), value :cryptObj["balance"],user_name:user_name,address:cryptObj["ownerIdentifier"]["address"]}})}
                      ></div>
                      <span style={{visibility:'hidden'}}>{top = top + 124}</span>
                      </>)
            }
        })()}
        <div class="Button_position">
          <span class="Button" onClick={() => navigate('/', { state: { user_name: user_name } })} >Back</span>
        </div>

        <div class="Button_position1">
            <span class="Button" onClick={() => tokenList()} >Tokens</span>
        </div>

        </div>    
    </div>
  );
}
