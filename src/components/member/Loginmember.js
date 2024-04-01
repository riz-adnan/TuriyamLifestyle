import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../Layout'
const Loginmember = () => {
    const [credentials, setCredentials] = useState({memberid: "", password: ""}) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/Mem/memberlogin", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
          },
            body: JSON.stringify({memberid: credentials.memberid, password: credentials.password})
        });
        const json = await response.json()
        
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            localStorage.setItem('memberid', json.memberid);
            navigate('/membersbymember')

        }
        else{
            alert("Invalid credentials");
        }
    }
    const handleForgot = async (e) => {
        e.preventDefault();
        navigate('/forgotmember')
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }



  return (
    <div>
        <Layout title={"Login For Member - TLS"}>

        <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="memberid" className="form-label">memberid</label>
                    <input type="memberid" className="form-control" value={credentials.memberid} onChange={onChange} id="memberid" name="memberid"  />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <button onClick={handleForgot} className="btn btn-danger" style={{marginTop:"10px"}}>Forgot Password</button>
        </Layout>
    </div>
  )
}

export default Loginmember