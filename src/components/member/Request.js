import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Request = (props) => {
    const [credentials, setCredentials] = useState({name: "", password: "",refid:"",Aadhar:"",Pan:"",AccountNum:"",IFSC:"",email:"",phone:"",address:""}) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/Mem/requestmember", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
          },
            body: JSON.stringify({name: credentials.name, password: credentials.password,refid:credentials.refid,Aadhar:credentials.Aadhar,Pan:credentials.Pan,AccountNum:credentials.AccountNum,IFSC:credentials.IFSC,email:credentials.email,phone:credentials.phone,address:credentials.address})
        });
        const json = await response.json()
       
        if (json.success){
            // Save the auth token and redirect
             alert("Your Request is saved");
            navigate('/verifymember')

        }
        else{
           
            alert("Invalid credentials maja aagaya");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">User Name</label>
                    <input type="name" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="nameHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="refid" className="form-label">refid</label>
                    <input type="refid" className="form-control" value={credentials.refid} onChange={onChange} name="refid" id="refid" />
                </div>
                <div className="mb-3">
                    <label htmlFor="Aadhar" className="form-label">Aadhar</label>
                    <input type="Aadhar" className="form-control" value={credentials.Aadhar} onChange={onChange} name="Aadhar" id="Aadhar" />
                </div>
                <div className="mb-3">
                    <label htmlFor="Pan" className="form-label">Pan</label>
                    <input type="Pan" className="form-control" value={credentials.Pan} onChange={onChange} name="Pan" id="Pan" />
                </div>
                <div className="mb-3">
                    <label htmlFor="AccountNum" className="form-label">AccountNum</label>
                    <input type="AccountNum" className="form-control" value={credentials.AccountNum} onChange={onChange} name="AccountNum" id="AccountNum" />
                </div>
                <div className="mb-3">
                    <label htmlFor="IFSC" className="form-label">IFSC</label>
                    <input type="IFSC" className="form-control" value={credentials.IFSC} onChange={onChange} name="IFSC" id="IFSC" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">email</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} name="email" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="phone" className="form-control" value={credentials.phone} onChange={onChange} name="phone" id="phone" />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">address</label>
                    <input type="address" className="form-control" value={credentials.address} onChange={onChange} name="address" id="address" />
                </div>
                

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Request