import React,{useContext} from 'react'
import memContext from '../../context/memContext';
    const Memcard = (props) => {
        const context = useContext(memContext);
        const { deleteMem } = context;
        const { mems, updateMem } = props;
        
        return (
            
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title">{mems.memberid}</h5>
                            
                        </div>
                        <p className="card-text">Name:  {mems.name}</p>
                        <p className="card-text">Referral: {mems.parentname}</p>

                        <p className="card-text">Total Sales: {mems.Lastmonthsales}</p>

                        <p className="card-text">Daily Sales: {mems.dailysales}</p>
                        <p className="card-text">Month Sales: {mems.Monthsales}</p>
                        <p className="card-text">GPG {mems.GPG}</p>
                        <p className="card-text">Rank {mems.rank}</p>
                        
                        <div className="d-flex align-items-center">
                            
                            <button className="btn btn-outline-danger btn-sm btn-rounded " onClick={()=>{deleteMem(mems._id)}}>Delete Member</button>
                            <button className="btn btn-outline-success btn-sm btn-rounded" onClick={()=>{updateMem(mems)}}>Update Member</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    export default Memcard
 