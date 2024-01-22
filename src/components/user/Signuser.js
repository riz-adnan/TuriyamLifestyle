import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../Layout';
import './login.css'

const Signuser = (props) => {
    const [credentials, setCredentials] = useState({name: "", password: "",email:"",phone:"",address:""}) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
          },
            body: JSON.stringify({name: credentials.name, password: credentials.password,email:credentials.email,phone:credentials.phone,address:credentials.address})
        });
        const json = await response.json()
        
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('cust', json.authtoken); 
            localStorage.setItem('username',json.user.name);
            localStorage.setItem('useraddress',json.user.address);
            localStorage.setItem('userphone',json.user.phone);
            localStorage.setItem('userid',json.user._id);
            navigate('/')

        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <Layout title={"Sign Up - TLS"}>
        <div>
            <form  onSubmit={handleSubmit}>
                <div className="container-fluid" id='card'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">User Name</label>
                    <input type="name" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="nameHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
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
                

                <button type="submit" className="btn btn-outline-success">Signup</button>
                </div>
            </form>
            
        </div>
        </Layout>
    )
}

export default Signuser