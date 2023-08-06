import React,{useContext} from 'react'
import prodContext from '../context/prodContext';
import './procar.css'
    const Cartcard = (props) => {
        const context = useContext(prodContext);
        const { deletefromcart } = context;
        const { prods} = props;
        
        return (
            <>
            


            <div>
            <div class="card" >
       <img src={prods.urltoimage} class="card-img-top" alt="..." id="changeheight"/>
       <div class="card-body">
         <h5 class="card-title">{prods.name}</h5>
         <p class="card-text">{prods.description}</p>
         <p class="card-text">{'\u20B9'} {prods.price}</p>
         
     
         
         <button type="button" class="btn btn-danger btn-rounded" onClick={()=>{deletefromcart(prods.id,prods.price)}}>Remove</button>
       </div>
     </div>
         </div>
         </>
        )
    }
    
    export default Cartcard