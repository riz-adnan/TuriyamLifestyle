import React, { useContext } from 'react'
import './procar.css'
import {Link} from 'react-router-dom'
import prodContext from '../context/prodContext'
const Productcard = (props) => {
  const {prod}=props;
  const mystyle={
    "width":"20rem",
    "height":"24em",
    "margin-top":"5em"
  }

  const context=useContext(prodContext);
  const {cart,cartids,Addtocart}=context;
  const handleClick = (e)=>{
    e.preventDefault();
    
    
    Addtocart(prod._id,prod.name, prod.description, prod.price,prod.urltoimage,prod.category);
    
    localStorage.setItem('cart',cart);
}

  
  return (
    <div>
       <div class="card" style={mystyle}>
  <img src={prod.urltoimage} class="card-img-top" alt="..." id="changeheight"/>
  <div class="card-body">
    <h5 class="card-title">{prod.name}</h5>
    <p class="card-text">{prod.description.substring(0,30)}</p>
    <p class="card-text">{'\u20B9'} {prod.price}</p>
    

    <Link href="/" className="btn btn-primary" onClick={handleClick}>Add To Cart</Link>
  </div>
</div>
    </div>
  )
}

export default Productcard