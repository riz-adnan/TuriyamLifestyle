import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Forgotcode = (props) => {
    const [credentials, setCredentials] = useState({code: ""});
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/Mem/resetpassword", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
          },
            credentials: 'include',
            body: JSON.stringify({code: credentials.code, confirmationEmail: localStorage.getItem('email'), confirmationCode: localStorage.getItem('code'), password: credentials.password})
        });
        const json = await response.json()
        const memberid = json.memberid;
            // Save the auth token and redirect
             alert(`Your memberid is ${memberid}. Use this to login`);
            navigate('/loginmember')

        
       
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }



  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="code" className="form-label">code</label>
            <input type="code" className="form-control" value={credentials.code} onChange={onChange} id="code" name="code" aria-describedby="codeHelp" />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Forgotcode