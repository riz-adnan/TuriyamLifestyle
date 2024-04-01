import React, {useContext,useState,useRef,useEffect}from 'react'

import Adnav from './Adnav'
import prodContext from '../../context/prodContext';
import Ordercard from './Ordercard';
const Adorders = () => {
    const context = useContext(prodContext);
  const {getorder,apporder,order}=context;
  useEffect(()=>{
    getorder()
    
  },[])
  const ref=useRef(null)
  const refClose=useRef(null)
  const[reqorder,setreqorder]=useState({id:"",ememberid:""})

    const updateorder =(currentorder)=>{
      ref.current.click();
      setreqorder({id:currentorder._id,ename:currentorder.memberid,})
    }
    const handleClick=(e)=>{
      apporder(reqorder.id,reqorder.ememberid)
      refClose.current.click()
    }
    const onChange=(e)=>
    setreqorder({...reqorder,[e.target.name]:e.target.value})
  return (
    <div>
        <Adnav/>
        <div>

<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{
                color:"black"
            }}  >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Member</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="memberid" className="form-label">Member ID</label>
                                    <input type="text" className="form-control" id="ememberid" name="ememberid" value={reqorder.ememberid} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                               
                                
                                
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  onClick={handleClick} type="button" className="btn btn-primary">Approve order</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Orders</h2>
                <div className="container mx-2"> 
                {reqorder.length===0 && 'No Orders to display'}
                </div>
                {order.map((p) => {
                    
                    return <Ordercard key={p._id} updateorder={updateorder} orders={p} />
                })}
            </div>
    </div>
    </div>
  )
}

export default Adorders