import React, {useContext,useState,useRef,useEffect}from 'react'
import memContext from '../../context/memContext'
import ReqMemcard from './ReqMemcard';
const Adreq = () => {
  const context = useContext(memContext);
  const {getrequest,requestmem,reqmem}=context;
  useEffect(()=>{
    getrequest()
  },[])
  const ref=useRef(null)
  const refClose=useRef(null)
  const[reqmems,setreqMem]=useState({id:"",eAadhar:"",ePan:"",ePhone:"",eAddress:"",eIFSC:"",eAccountNum:""})

    const updateMem =(currentMem)=>{
      ref.current.click();
      setreqMem({id:currentMem._id,eAadhar:currentMem.Aadhar,ePan:currentMem.Pan,ePhone:currentMem.phone,eAddress:currentMem.address,eIFSC:currentMem.IFSC,eAccountNum:currentMem.AccountNum})
    }
    const handleClick=(e)=>{
      requestmem(reqmems.id,reqmems.eAadhar,reqmems.ePan,reqmems.ePhone,reqmems.eAddress,reqmems.eIFSC,reqmems.eAccountNum)
      refClose.current.click()
    }
    const onChange=(e)=>
    setreqMem({...reqmems,[e.target.name]:e.target.value})

  return (
    <div style={{color:"black"
    }}>

<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Member</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="Aadhar" className="form-label">Aadhar</label>
                                    <input type="text" className="form-control" id="eAadhar" name="eAadhar" value={reqmems.eAadhar} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Pan" className="form-label">Pan</label>
                                    <input type="text" className="form-control" id="ePan" name="ePan" value={reqmems.ePan} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Phone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" id="ePhone" name="ePhone" value={reqmems.ePhone} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Address" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="eAddress" name="eAddress" value={reqmems.eAddress} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="IFSC" className="form-label">IFSC</label>
                                    <input type="text" className="form-control" id="eIFSC" name="eIFSC" value={reqmems.eIFSC} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="AccountNum" className="form-label">AccountNum</label>
                                    <input type="text" className="form-control" id="eAccountNum" name="eAccountNum" value={reqmems.eAccountNum} onChange={onChange} />
                                </div>
                                
                                
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  onClick={handleClick} type="button" className="btn btn-primary">Update Member</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Members</h2>
                <div className="container mx-2"> 
                {reqmems.length===0 && 'No Member to display'}
                </div>
                {reqmem.map((p) => {
                    
                    return <ReqMemcard key={p._id} updateMem={updateMem} reqmems={p} />
                })}
            </div>
    </div>
  )
}

export default Adreq