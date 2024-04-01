import {React,useContext} from 'react';
import {Link,useLocation} from "react-router-dom";
import './Nav.css';

const Navbar = () => {
  let location = useLocation();
  const handleLogout=()=>{
    localStorage.removeItem('auth');
    localStorage.removeItem('username')
  }


  return (
    <div className="navi">
        <nav className="navbar navbar-expand-lg navbar-dark " >
  <div className="container-fluid" >
    <Link to="/" className="navbar-brand" >Turiyam Lifestyles</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav my-2">
        <li className="nav-item">
          <Link to="/" className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" >Home</Link>
        </li>
        
        
        <li className="nav-item">
          <Link to="/men" className={`nav-link ${location.pathname==="/men"? "active": ""}`} >Products</Link>
        </li>
        
        {(window.localStorage.getItem('username'))?(
        <>
        <li className="nav-item">
          <Link to="/" className="nav-link" >{window.localStorage.getItem('username')}</Link>
          
        </li>
        
        </>):(
        <>
        
        </>
        )}
        <li className="nav-item">
          <Link to='/cart' className={`nav-link ${location.pathname==="/cart"? "active": ""}`}>Cart</Link>
        </li>
        

        {(window.localStorage.getItem('username'))?(
        <>
        <li className="nav-item">
        <button class="btn btn-outline-success" type="submit" onClick={handleLogout}>Logout</button>
          
        </li>
        
        </>):(
        <>
        <li className="nav-item">
          <Link to="/loginuser" className={`nav-link ${location.pathname==="/longinuser"? "active": ""}`} >Login</Link>
        </li>
        
        </>
        )}


      </ul>
      
   
      
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar