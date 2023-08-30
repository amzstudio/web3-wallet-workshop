import '../../css/main.css'
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import { Navigate, useNavigate } from 'react-router-dom';
import {useEffect, useState, useRef} from 'react';

export default function CustomerList() {
  const navigate = useNavigate();

  const hasWindow = typeof window !== 'undefined';
  const [widthsize, setWidthsize] = useState();
  const [width, setWidth] = useState(hasWindow ? window.innerWidth : null);
  


  //setWidthsize(3000)

  return (
    <div>
      <div class="mobile_bg">


        <span style={{top:'172px'}} class="list-subject">Customer-List</span>
        <div style={{top:'202px'}}class="asset_line"></div>
        <div style={{top:'212px'}}  class="customer_box"
        onClick={() => navigate('/wallet',{state:{user_name:'Satoshi'}})}
        ></div>
        <span style={{top:'243px'}} class="customer_name">Satoshi</span>
        <div style={{top:'233px'}} class="Satoshi"
        onClick={() => navigate('/wallet',{state:{user_name:'Satoshi'}})}
        ></div>

        <div style={{top:'316px'}}class="asset_line"></div>
        <div style={{top:'326px'}}  class="customer_box"
        onClick={() => navigate('/wallet',{state:{user_name:'Vitalik'}})}
        ></div>
        <span style={{top:'357px'}} class="customer_name">Vitalik</span>
        <div style={{top:'347px'}} class="Vitalik"
        onClick={() => navigate('/wallet',{state:{user_name:'Vitalik'}})}
        ></div>  

        <div style={{top:'430px'}}class="asset_line"></div>
        <div style={{top:'440px'}}  class="customer_box"
        onClick={() => navigate('/wallet',{state:{user_name:'Peccy'}})}
        ></div>
        <span style={{top:'471px'}} class="customer_name">Peccy</span>
        <div style={{top:'461px'}} class="Peccy"
        onClick={() => navigate('/wallet',{state:{user_name:'Peccy'}})}
        ></div> 


        </div>    
    </div>
  );
}
