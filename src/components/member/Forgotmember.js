import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Forgotmember = (props) => {
    const [credentials, setCredentials] = useState({email: ""});
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("/api/Mem/forgotpassword", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
          },
            body: JSON.stringify({email: credentials.email})
        });
        const json = await response.json()
        
        localStorage.setItem('email', Object.keys(json.confirmations)[0]);
        localStorage.setItem('code', Object.values(json.confirmations)[0]);
            
           if(json.success){  
            navigate('/forgotcode')
           }
           else{
               alert("Put the mail id with which you have registered.");
           }

        
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }



  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">email</label>
            <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Forgotmember