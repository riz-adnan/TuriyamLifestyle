import React, {useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import Layout from '../Layout'

const Loginuser = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const response = await fetch("/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
          },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
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
    <div>
        <Layout title={"Login For Member - TLS"}>
        <div>
        <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">email</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email"  />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/signuser"><button type="signup" className="btn btn-primary ml-1">Sign Up</button></Link>
            </form>
            </div>
        </Layout>
    </div>
  )
}

export default Loginuser