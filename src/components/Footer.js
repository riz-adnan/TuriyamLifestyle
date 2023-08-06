import React from 'react';
import './Foot.css'
import {Link} from 'react-router-dom';
const Footer = () => {
  return (
    <div className='foot'>
        
<div className="container my-5">
 
  <footer
          className="text-center text-lg-start text-white"
          
          >
  
    <div className="container p-4 pb-0">
    
      <section className="">
       
        <div className="row">
         
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              Turiam Lifestyles
            </h6>
            <p>
            Turiyam Lifestyles Ltd. is an online business platform that offer opportunity of growth and development of individuals while offering them a better lifestyle. Turiyam Lifestyle is a modern way of doing business in which growth is fast and returns are high.
            </p>
          </div>
         
          <hr className="w-100 clearfix d-md-none" />

        
         

          <hr className="w-100 clearfix d-md-none" />

      
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              Useful links
            </h6>
            <p>
              <Link to="/adminlogin" className="text-white">Admin</Link>
            </p>
            <p>
              <Link to="/loginmember" className="text-white">Member Login</Link>
            </p>
            <p>
              <Link to="/about" className="text-white">About Us</Link>
            </p>
            <p>
              <Link to="/" className="text-white">Help</Link>
            </p>
          </div>

        
          <hr className="w-100 clearfix d-md-none" />

          
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
            <p><i className="fas fa-home mr-3"></i> POWER HOUSE ROAD KORBA, CHATTISGARH</p>
            <p><i className="fas fa-envelope mr-3"></i> lavkushshukla22@gmail.com</p>
            <p><i className="fas fa-phone mr-3"></i> + 91 9695211062</p>
            <p><i className="fas fa-print mr-3"></i> + 91 9695211062</p>
          </div>
         
        </div>
     
      </section>
    

      <hr className="my-3"/>

      
      <section className="p-3 pt-0">
        <div className="row d-flex align-items-center">
        
          <div className="col-md-7 col-lg-8 text-center text-md-start">
          
            <div className="p-3">
              © 2023 Copyright:
              <Link className="text-white" to="https://www.zaubacorp.com/company/TURIYAM-LIFESTYLE-PRIVATE-LIMITED/U52609CT2022PTC013845"
                 >TuriamLifestyles.com</Link>
            </div>
          
          </div>
         

        
          <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
          
            <Link to="https://www.zaubacorp.com/company/TURIYAM-LIFESTYLE-PRIVATE-LIMITED/U52609CT2022PTC013845" 
               className="btn btn-outline-light btn-floating m-1"
               
               role="button"
               ><i className="fab fa-facebook-f"></i></Link>

           
            <Link to="https://www.zaubacorp.com/company/TURIYAM-LIFESTYLE-PRIVATE-LIMITED/U52609CT2022PTC013845" 
               className="btn btn-outline-light btn-floating m-1"
               
               role="button"
               ><i className="fab fa-twitter"></i></Link>

           
            <Link to="https://www.zaubacorp.com/company/TURIYAM-LIFESTYLE-PRIVATE-LIMITED/U52609CT2022PTC013845" 
               className="btn btn-outline-light btn-floating m-1"
               
               role="button"
               ><i className="fab fa-google"></i></Link>

            
            <Link to="https://www.zaubacorp.com/company/TURIYAM-LIFESTYLE-PRIVATE-LIMITED/U52609CT2022PTC013845" 
               className="btn btn-outline-light btn-floating m-1"
               
               role="button"
               ><i className="fa fa-instagram"></i></Link>
          </div>
          
        </div>
      </section>
     
    </div>
    
  </footer>
  
</div>

    </div>
  )
};

export default Footer;