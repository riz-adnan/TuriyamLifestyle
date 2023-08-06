import React, { useContext, useEffect, useRef, useState } from 'react'
import prodContext from "../../context/prodContext"

import AddProd from './Addprod';
import Adcard from './Adcard';
const Adpro = () => {
    const context = useContext(prodContext);
    const { prod, getProd, editProd } = context;
    useEffect(() => {
        getProd()
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [prods, setProd] = useState({id: "", ename: "", edescription: "", eprice: "",eurltoimage:"",ecategory:""})

    const updateProd = (currentProd) => {
        ref.current.click();
        setProd({id: currentProd._id, ename: currentProd.name, edescription: currentProd.description, eprice:currentProd.price,eurltoimage:currentProd.urltoimage,ecategory:currentProd.category})
    }

    const handleClick = (e)=>{ 
        editProd(prods.id, prods.etitle, prods.edescription, prods.eprice,prods.eurltoimage,prods.ecategory)
        refClose.current.click();
    }

    const onChange = (e)=>{
        setProd({...prods, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddProd />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="ename" name="ename" value={prods.ename} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={prods.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="text" className="form-control" id="eprice" name="eprice" value={prods.eprice} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="urltoimage" className="form-label">urltoimage</label>
                                    <input type="text" className="form-control" id="eurltoimage" name="eurltoimage" value={prods.eurltoimage} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">category</label>
                                    <input type="text" className="form-control" id="ecategory" name="ecategory" value={prods.ecategory} onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={prods.ename.length<3 || prods.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Product</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Products</h2>
                <div className="container mx-2"> 
                {prods.length===0 && 'No products to display'}
                </div>
                {prod.map((p) => {
                    
                    return <Adcard key={p._id} updateProd={updateProd} prods={p} />
                })}
            </div>
        </>
    )
}

export default Adpro;