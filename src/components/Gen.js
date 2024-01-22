import React, { useContext, useEffect, useRef, useState } from 'react';
import Productcard from './Productcard';
import prodContext from '../context/prodContext';
import Layout from './Layout';
import './procar.css'
const Gen = () => {

    const context=useContext(prodContext);
    const {prod,getProdGen}=context;

    useEffect(()=>{
        getProdGen()
    },[])

  return (
    
    <div>
        <Layout title={"Products-Turiyam Lifestyles"}>


        <div className="row my-3" id='centrethis'>
         
                <div className="container mx-2"> 
                {prod.length===0 && 'No Products to display'}
                <div class="container text-center">
                <div class="row row-cols-md-3 row-cols-1">
                {prod.map((p) => {
                    return <Productcard key={prod._id}  prod={p} />
                })}
            </div>
            </div>
            </div>
            </div>
            </Layout>
    </div>
  )
}

export default Gen