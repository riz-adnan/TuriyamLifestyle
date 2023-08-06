import React,{useContext} from 'react'
import prodContext from '../../context/prodContext';
    const Ordercard = (props) => {
        const context = useContext(prodContext);
        const { deleteorder } = context;
        const { orders, updateorder } = props;
        
        return (
            
            
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        
                        <p className="card-text">Products: {orders.productsname.map((p)=>{ return <> <br /> {p}  </> })}</p>
                        <p className="card-text">Referral: {orders.refid}</p>
                        <p className="card-text">Price: {orders.price}</p>
                        <p className="card-text">Contacts: {orders.usercontact[0]} <br /> {orders.usercontact[1]} <br /> {orders.usercontact[2]}</p>
                        
                    </div>
                    <div className="d-flex align-items-center">
                            
                            <button className="btn btn-outline-danger btn-sm btn-rounded " onClick={()=>{deleteorder(orders._id)}}>Delete Order</button>
                            <button className="btn btn-outline-success btn-sm btn-rounded" onClick={()=>{updateorder(orders)}}>Update Order</button>
                        </div>
                </div>
            </div>
        )
    }
    
    export default Ordercard