import { useState } from "react";
import prodContext from "./prodContext";


const ProdState = (props) => {
  
  const prodInitial = []
  const cartInitial = []
  const cartidsInitial=[]
  const ordersInitial=[]

  const [prod, setProd] = useState(prodInitial)
  const [cart, setCart] = useState(cartInitial)
  const [cartids, setCartids]= useState(cartidsInitial)
  const [orderprice,setPrice]=useState(0);
  const [order,setOrder]=useState(ordersInitial)
  // Get all Notes
  const getProd = async () => {
    // API Call 
    const response = await fetch(`/api/Pro/`, {
      method: 'GET',
      
      
    });
    const json = await response.json() 
    setProd(json)
  }

  //Get All Men Products
  const getProdMen = async () => {
    // API Call 
    const response = await fetch(`/api/Pro/`, {
      method: 'GET',
      
      
    });
    const json = await response.json() 
    const jsonmen=json.filter((json)=>{return json.category==="MEN"})
    setProd(jsonmen)
  }
  const getProdWomen = async () => {
    // API Call 
    const response = await fetch(`/api/Pro/`, {
      method: 'GET',
      
      
    });
    const json = await response.json() 
    const jsonmen=json.filter((json)=>{return json.category==="WOMEN"})
    setProd(jsonmen)
  }
  const getProdGen = async () => {
    // API Call 
    const response = await fetch(`/api/Pro/`, {
      method: 'GET',
      
      
    });
    const json = await response.json() 
    const jsonmen=json.filter((json)=>{return json.category==="GEN"})
    setProd(jsonmen)
  }


   // Add a Note
   const addProd = async (name, description, price,urltoimage,category) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`/api/Pro/addprod`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": window.localStorage.getItem('token')
      },
      body: JSON.stringify({name, description, price,urltoimage,category})
    });

    const prods = await response.json();
    setProd(prod.concat(prods))
  }
  //Add product into cart 

  const Addtocart = async (id,name, description, price,urltoimage,category)=>{
    let newprod={id,name, description, price,urltoimage,category};
    setCart(cart.concat(newprod))
    setCartids(cartids.concat(id))
    setPrice(orderprice+parseInt(price))

  }

  const deletefromcart =async(id,price) =>{
    const newcart=cart.filter((cart)=>{return cart.id !== id})
    const newcartid=cartids.filter((cartids)=>{return cartids.id!==id})
    let neworderprice=orderprice-parseInt(price)
    
    
    setCart(newcart);
    setCartids(newcartid);
    setPrice(neworderprice);
    
  }

// post order
 
  const postorder = async (cart,refid,buyer,price)=>{
    const response = await fetch(`/api/Orders/postorder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": window.localStorage.getItem('cust')
      },
      body: JSON.stringify({ cart,refid,buyer})
    });
      const neworder=await response.json();
      setOrder(order.concat(neworder))
      setCart(cartInitial)
      setCartids(cartidsInitial)
      setPrice(0)
  }

  const getorder = async ()=>{
    const response = await fetch(`/api/Orders/getorders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": window.localStorage.getItem('token')
      },
      
    });
    const json=await response.json();
    setOrder(json); 
  }
   
  const apporder = async (id,memberid)=>{
    const response= await fetch(`/api/Orders/approveorder/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": window.localStorage.getItem('token'),
        
      },
      body: JSON.stringify({memberid})
    })
    const neworder= order.filter((order)=>{return order._id!==id})
    setOrder(neworder);
  }

  const deleteorder = async (id)=>{
    const response= await fetch(`/api/Orders/deleteorder/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": window.localStorage.getItem('token')
      },
    })
    const neworder= order.filter((order)=>{return order._id!==id})
    setOrder(neworder);
  }

  // Delete a Product
  const deleteProd = async (id) => {
    // API Call
    const response = await fetch(`/api/Pro/deleteprod/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": window.localStorage.getItem('token')
      }
    });
    const json = response.json(); 
    const newProd = prod.filter((prod) => { return prod._id !== id })
    setProd(newProd)
  }

  // Edit a Note
  const editProd = async (id, name, description, price,urltoimage,category) => {
    // API Call 
    const response = await fetch(`/api/Pro/updateprod/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": window.localStorage.getItem('token')
      },
      body: JSON.stringify({name, description, price,urltoimage,category})
    });
    const json = await response.json(); 

     let newProd = JSON.parse(JSON.stringify(prod))
    // Logic to edit in client
    for (let index = 0; index < newProd.length; index++) {
      const element = newProd[index];
      if (element._id === id) {
        newProd[index].name = name;
        newProd[index].description = description;
        newProd[index].price = price; 
        newProd[index].urltoimage=urltoimage;
        newProd[index].category=category;
        break; 
      }
    }  
    setProd(newProd);
  }



  return (
    <prodContext.Provider value={{ prod, getProd, deleteProd,editProd,addProd,getProdMen,getProdWomen,getProdGen,cart,cartids,Addtocart,deletefromcart,orderprice,order,postorder,getorder,deleteorder,apporder}}>
      {props.children}
    </prodContext.Provider>
  )

}
export default ProdState;