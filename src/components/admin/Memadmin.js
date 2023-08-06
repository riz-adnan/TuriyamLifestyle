
import React, { useContext, useEffect, useRef, useState } from 'react'
import memContext from "../../context/memContext"


import Memcard from './Memcard';
const Memadmin = () => {
    const context = useContext(memContext);
     const {mem, getMemm, getMema, editMem} = context;
    useEffect(() => {
        getMema()
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [mems, setMem] = useState({id: "", ememberid: "",eLastmonthsales:"", edailysales: "", eMonthsales: "",eGPG:"",erank:"",echildranks:""})

    const updateMem = (currentMem) => {
        ref.current.click();
        setMem({id: currentMem._id, ememberid: currentMem.memberid,eLastmonthsales: currentMem.Lastmonthsales, edailysales: currentMem.dailysales, eMonthsales:currentMem.Monthsales, eGPG: currentMem.GPG, erank:currentMem.rank, echildranks: currentMem.childranks})
    }

    const handleClick = (e)=>{ 
        
        editMem(mems.id, mems.ememberid,mems.eLastmonthsales, mems.edailysales, mems.eMonthsales,mems.eGPG,mems.erank,mems.echildranks)
        
        refClose.current.click();
    }

    const onChange = (e)=>{
        setMem({...mems, [e.target.name]: e.target.value})
    }

    return (
        <>
            
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
                                    <label htmlFor="memberid" className="form-label">Member ID</label>
                                    <input type="text" className="form-control" id="ememberid" name="ememberid" value={mems.ememberid} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Lastmonthsales" className="form-label">Total Sales</label>
                                    <input type="text" className="form-control" id="eLastmonthsales" name="eLastmonthsales" value={mems.eLastmonthsales} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dailysales" className="form-label">dailysales</label>
                                    <input type="text" className="form-control" id="edailysales" name="edailysales" value={mems.edailysales} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Monthsales" className="form-label">Month Sales</label>
                                    <input type="text" className="form-control" id="eMonthsales" name="eMonthsales" value={mems.eMonthsales} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="GPG" className="form-label">GPG</label>
                                    <input type="text" className="form-control" id="eGPG" name="eGPG" value={mems.eGPG} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="rank" className="form-label">Rank</label>
                                    <input type="text" className="form-control" id="erank" name="erank" value={mems.erank} onChange={onChange} />
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
                {mems.length===0 && 'No Member to display'}
                </div>
                {mem.map((p) => {
                    
                    return <Memcard key={p._id} updateMem={updateMem} mems={p} />
                })}
            </div>
        </>
    )
}

export default Memadmin;
 