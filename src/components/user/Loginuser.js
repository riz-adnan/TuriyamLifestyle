import React, {useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import Layout from '../Layout'
import './login.css'
const Loginuser = () => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const response = await fetch("http://localhost:5000/api/auth/login", {
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
        <Layout title={"Login For User - TLS"}>
        <div>
        <form  onSubmit={handleSubmit}>
          
        
                <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card-group mb-0">
          
            <div class="card-body ">
              <h1>Login</h1>
              <p class="text-muted">Sign In to your account</p>
              <div class="input-group mb-3">
                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email"  />
              </div>
              <div class="input-group mb-4">
                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
              </div>
              <div class="row">
                <div class="col-6">
                <button type="submit" className="btn btn-outline-success">Log In</button>
                
                </div>
                
                <div class="col-6 text-right">
                  <button type="button" class="btn btn-link px-0">Forgot password?</button>
                </div>
              </div>
            </div>
          
          <div class="card text-white bg-primary py-5 d-md-down-none" >
            <div class="card-body text-center">
              <div>
                <h2>Sign up</h2>
                <p>Become our Customer today. We provide the best Lifestyle Products. Sign up with few clicks.</p>
                <Link to="/signuser"><button type="button" class="btn btn-outline-success  mt-3" >Sign Up</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

            </form>
            </div>
        </Layout>
    </div>
  )
}

export default Loginuser