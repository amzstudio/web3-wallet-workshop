import '../../css/main.css'
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, useNavigate,useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

const headers = {
  "Access-Control-Allow-Origin": process.env.REACT_APP_URL,
  "Access-Control-Allow-Credentials":"true"
}; 

function delay() {
  return new Promise(resolve => setTimeout(resolve, 600));
}

export default function TransactionStatusDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const crypto_name = location.state.crypto;
  const crypto_value = location.state.value;
  const user_name = location.state.user_name;
  const address = location.state.address;
  const trx_name = location.state.trx;
  const trx_date = location.state.trx_date;
  const crypto_symbol = crypto_name =='BitCoin' ? 'BTC' : 'ETH';

  //const API_ADDR = process.env.REACT_APP_API_ADDR+'/step3/'+crypto_name+'_MAINNET/'+'0x0782c31f221f7717912f29ba13b67e5a0840f812f6aba6cad2146e8ed021d410';
  const API_ADDR = process.env.REACT_APP_API_ADDR+'/step3/'+crypto_name+'_MAINNET/'+trx_name;

  console.log(API_ADDR);

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const getPosts = async () => {
      const result = await axios.get(
         API_ADDR,{headers}
      );
      console.log("call");
      await delay();
  
      setPosts(result.data);
  
    };
    getPosts();
  }, [API_ADDR]);


  if( posts["transaction"] === undefined){
    console.log("undefined");
  
   }else{
      console.log("defined");
      console.log(posts["transaction"] )

   }


  const from_addr = address;

 
/*
  const trxdetail = posts["transaction"]["events"].map((cryptObj,index) =>  <>

                      <div style={{top: top+6+'px'}}  class="crypto_box_event" ></div>
                      <span style={{top:top+15+'px'}} class="crypto_trx" ><b>Event : </b> {cryptObj["eventType"]}</span>
                      <span style={{top:top+52+'px'}} class="crypto_trx"><b>Amount : </b> {cryptObj["value"]} {cryptObj["tokenId"]} </span>
                      <span style={{visibility:'hidden'}}>{top = top + 110}</span>

  </>
  );
*/

  return (
    <div>
      <div class="mobile_bg">
        <div class="space"></div>
        <div class={"top_user_"+user_name+"_picture"}></div>
        <span class="top_user_name">{user_name}</span>
        <div class="space"></div>
        


        {(() => {
            
            <>
            <span style="hidden"></span>
            </>

            let top = 0;
            if(posts["transaction"] === undefined){
                return null;
            }else{
                <>
   
                </>


                return  <>

                <span style={{top:'125px'}} class="crypto_trxdetail_header">Trx ID ({posts["transaction"]["events"][0]["tokenId"]})</span>
                <span style={{top:'155px'}} class="crypto_trxdetail_value1"> {trx_name}</span>


                <span style={{top:'205px'}} class="crypto_trxdetail_header">Date</span>
                <span style={{top:'235px'}} class="crypto_trxdetail_value1">{trx_date}</span>

                <div style={{top:'280px'}}class="asset_line"></div>

                <span style={{top:'300px'}} class="crypto_trxdetail_header">From Address</span>

                <span style={{top:'330px'}} class="crypto_trxdetail_value1">{from_addr}</span>

                <span style={{top:'360px'}} class="crypto_trxdetail_header">To Address</span>

                <span style={{top:'390px'}} class="crypto_trxdetail_value1">{posts["transaction"]["events"][0]["tokenId"]=='btc' ? posts["transaction"]["events"][0]["to"] : posts["transaction"]["to"]}</span>
                      
                <span style={{top:'420px'}} class="crypto_trxdetail_header">{posts["transaction"]["events"][0]["tokenId"]=='btc' ? 'Transaction' : 'Gas'} Fee</span>

                <span style={{top:'450px'}} class="crypto_trxdetail_value1">{posts["transaction"]["events"][0]["tokenId"]=='btc' ? posts["transaction"]["transactionFee"] : posts["transaction"]["effectiveGasPrice"]}</span>
                
                <div style={{top:'475px'}} class="event-list-area">
                { 
                   posts["transaction"]["events"].map((cryptObj,index) =>  <>

                  <div style={{top: top+6+'px'}}  class="crypto_box_event" ></div>
                  <span style={{top:top+15+'px'}} class="crypto_trx" ><b>Event : </b> {cryptObj["eventType"]}</span>
                  <span style={{top:top+52+'px'}} class="crypto_trx"><b>Amount : </b> {cryptObj["value"]} {cryptObj["tokenId"]} </span>
                  <span style={{visibility:'hidden'}}>{top = top + 110}</span>

                  </>
                  )}
                </div>
                </>
                


         
       
            }
        })()}
        
        <div class="Button_position">
            <span  class="Button" onClick={() => navigate('/TransactionStatus',{state:{crypto:crypto_name, value :crypto_value, user_name:user_name,address:address}})}>Back</span>
        </div>

      </div>    
    </div>
  );
}
