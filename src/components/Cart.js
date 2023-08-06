import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import prodContext from "../context/prodContext"
import Layout from './Layout'
import Cartcard from './Cartcard'

const Cart = () => {
    const context = useContext(prodContext);
    const { orderprice,cart,cartids,postorder } = context;
    const [refid,setRefid]=useState("");
    const navigate = useNavigate();
    const onChange = (e)=>{
        setRefid( e.target.value)
    }

    const postOrder =  async () =>{
        
        console.log(cartids)
        console.log(window.localStorage.getItem("userid"))
        postorder(cartids,refid,window.localStorage.getItem("userid"))
        setRefid("")
        navigate('/');
        

    }


  return (
    <div>
        <Layout>
        <>
        <div className="row my-3">
                <h2>Your Products</h2>
                <div className="container mx-2"> 
                {cart.length===0 && 'No products to display'}
                </div>
                {cart.map((p) => {
                    
                    return <Cartcard key={p._id} prods={p} />
                })}
            </div>
            <div className="row my-3">
                <h3>  Total Order Price : {'\u20B9'} {orderprice}</h3>
            {(window.localStorage.getItem("username"))?
            (<>
                <h4> User Name: {(window.localStorage.getItem("username"))}</h4>
                <h4> Address : {(window.localStorage.getItem("useraddress"))}</h4>
                <h4> Phone : {(window.localStorage.getItem("userphone"))}</h4>
                <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Referral</span>
                <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={onChange}/>
                </div>
                <button type="button" class="btn btn-success btn-rounded" onClick={postOrder}  style={{width:"24rem"}}>Place Order</button>

            </>)
        : (
            <>
             <button type="button" class="btn btn-success btn-rounded" style={{width:"24rem"}}>Login To Place Order</button>
             </>
        )   
        
        }
            
               
            </div>
        </>
           
        </Layout>
    </div>
  )
}

export default Cart