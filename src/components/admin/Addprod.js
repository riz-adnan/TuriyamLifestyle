import React, {useContext, useState} from 'react'
import prodContext from '../../context/prodContext';

const AddProd = () => {
    const context = useContext(prodContext);
    const {addProd} = context;

    const [prod, setProd] = useState({name: "", description: "", price: "",urltoimage:"",category:""})

    const handleClick = (e)=>{
        e.preventDefault();
        addProd(prod.name, prod.description, prod.price,prod.urltoimage,prod.category);
        setProd({name: "", description: "", price: "", urltoimage:"", category:""})
    }

    const onChange = (e)=>{
        setProd({...prod, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Product</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={prod.title} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={prod.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="number" className="form-label">Price</label>
                    <input type="text" className="form-control" id="price" name="price" value={prod.price} onChange={onChange} minLength={1} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="urltoimage" className="form-label">urltoimage</label>
                    <input type="text" className="form-control" id="urltoimage" name="urltoimage" value={prod.urltoimage} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">category</label>
                    <input type="text" className="form-control" id="category" name="category" value={prod.category} onChange={onChange} minLength={5} required />
                </div>
               
                <button disabled={prod.name.length<2 || prod.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Prod</button>
            </form>
        </div>
    )
}

export default AddProd