import {React,useContext} from 'react';
import {Link,useLocation} from "react-router-dom";

const Adnav = () => {
  let location=useLocation()
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link to="/adminpanel" className="navbar-brand" >Admin</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/adminpanel" className={`nav-link ${location.pathname==="/adminpanel"? "active": ""}`} aria-current="page" >Products</Link>
        </li>
        <li className="nav-item">
          <Link to="/adminpanel/member" className={`nav-link ${location.pathname==="/adminpanel/member"? "active": ""}`} >Members</Link>
        </li>
        <li className="nav-item">
          <Link to="/adminpanel/request" className={`nav-link ${location.pathname==="/adminpanel/request"? "active": ""}`} >Requests</Link>
        </li>
        <li className="nav-item">
          <Link to="/adminpanel/oders" className={`nav-link ${location.pathname==="/adminpanel/oders"? "active": ""}`} >Orders</Link>
        </li>
        
      </ul>
      
   
      
    </div>
  </div>
</nav>
    </div>
  )
}

export default Adnav