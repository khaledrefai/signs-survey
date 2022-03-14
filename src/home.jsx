import React from 'react';
 import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'bootstrap/dist/css/bootstrap.rtl.css';
import {InfoDialog} from './DialogDemo'
import{MyCarousel}  from './carousel'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import{useState , useEffect} from "react"

export const  Home =() =>{
 const [visitorId,setVisitorId] = useState("")
 useEffect(()=>{
 // Initialize an agent at application startup.
 const fpPromise = FingerprintJS.load();
 (async () => {
   // Get the visitor identifier when you need it.
   const fp = await fpPromise
   const result = await fp.get()
   setVisitorId(result.visitorId)
   console.log(result.visitorId)
 })()
 });
 
    return (
      <>
        <div className="row header">
        <div className='col-6 text-end'>
      

          </div>

         <div className='col-6 text-start'>
<InfoDialog/>
         </div>

        </div>

        <div className="row body">
        <div className='col-12'>
<MyCarousel visitorId={visitorId}/>
        </div>
        </div>

        </>
    );
}

export default Home;