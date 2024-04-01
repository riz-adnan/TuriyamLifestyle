import React,{useContext} from 'react'
import memContext from '../../context/memContext';
    const ReqMemcard = (props) => {
        const context = useContext(memContext);
        const { deleteMemm } = context;
        const { reqmems, updateMem } = props;
        
        return (
            
            
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title">{reqmems.name}</h5>
                           
                        </div>
                        <p className="card-text">Aadhar {reqmems.Aadhar}</p>
                        <p className="card-text">Pan {reqmems.Pan}</p>
                        <p className="card-text">Phone {reqmems.phone}</p>
                        <p className="card-text">Address {reqmems.address}</p>
                        <p className="card-text">Referral {reqmems.refid}</p>
                        <p className="card-text">IFSC {reqmems.IFSC}</p>
                        <p className="card-text">ACCOUNT NUMBER {reqmems.AccountNum}</p>
                    </div>
                    <div className="d-flex align-items-center">
                            
                            <button className="btn btn-outline-danger btn-sm btn-rounded " onClick={()=>{deleteMemm(reqmems._id)}}>Delete Member</button>
                            <button className="btn btn-outline-success btn-sm btn-rounded" onClick={()=>{updateMem(reqmems)}}>Update Member</button>
                        </div>
                </div>
            </div>
        )
    }
    
    export default ReqMemcard