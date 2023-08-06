import React,{useContext} from 'react'
import prodContext from '../../context/prodContext';
    const Adcard = (props) => {
        const context = useContext(prodContext);
        const { deleteProd } = context;
        const { prods, updateProd } = props;
        
        return (
            
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title">{prods.name}</h5>
                           
                        </div>
                        <p className="card-text">{prods.description}</p>
                        <p className="card-text">{prods.price}</p>
                        <p className="card-text">{prods.urltoimage}</p>
                        <p className="card-text">{prods.category}</p>
                    </div>
                    <div className="d-flex align-items-center">
                            
                            <button className="btn btn-outline-danger btn-sm btn-rounded " onClick={()=>{deleteProd(prods._id)}}>Delete Product</button>
                            <button className="btn btn-outline-success btn-sm btn-rounded" onClick={()=>{updateProd(prods)}}>Update Product</button>
                        </div>
                </div>
            </div>
        )
    }
    
    export default Adcard
 