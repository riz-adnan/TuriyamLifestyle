import React from 'react';
import './Foot.css'
import {Link} from 'react-router-dom';
const Footer = () => {
  return (
    <div className='foot'>
       
<div >
 
  <footer
          className="text-center text-lg-start text-black"
          
          >
  
    <div className="container p-4 pb-0">
    
      
    

     

      
      <section className="p-1 pt-0">
        <div className="row d-flex align-items-center">
        
          <div className="col-md-7 col-lg-8 text-center text-md-start" id='copyright'>
          
            
              © 2022 Copyright:
              <Link id='link' to="https://www.zaubacorp.com/company/TURIYAM-LIFESTYLE-PRIVATE-LIMITED/U52609CT2022PTC013845"
                 >TuriamLifestyles.com</Link> | 
              <Link id='link' to="/termsofservice" style={{marginLeft:'10px'}}
                 >Terms of service</Link> | 
                 <Link id='link' to="/usefullinks" style={{marginLeft:'10px'}}
                 >Useful Links</Link>
          
          </div>
         

        
          <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end text-black">
          
            <Link to="https://www.zaubacorp.com/company/TURIYAM-LIFESTYLE-PRIVATE-LIMITED/U52609CT2022PTC013845" 
               className="btn btn-outline-dark btn-floating m-1"
               
               role="button"
               ><i className="fa-brands fa-facebook" id="icons1"></i></Link>

           
            <Link to="https://www.zaubacorp.com/company/TURIYAM-LIFESTYLE-PRIVATE-LIMITED/U52609CT2022PTC013845" 
               className="btn btn-outline-dark btn-floating m-1"
               
               role="button"
               ><i className="fab fa-linkedin " id="icons2"></i></Link>

           
            <Link to="https://www.zaubacorp.com/company/TURIYAM-LIFESTYLE-PRIVATE-LIMITED/U52609CT2022PTC013845" 
               className="btn btn-outline-dark btn-floating m-1"
               
               role="button"
               ><i className="fab fa-google" id="icons3"></i></Link>

            
            <Link to="https://www.zaubacorp.com/company/TURIYAM-LIFESTYLE-PRIVATE-LIMITED/U52609CT2022PTC013845" 
               className="btn btn-outline-dark btn-floating m-1"
               
               role="button"
               ><i className="fa fa-instagram" id="icons4"></i></Link>
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