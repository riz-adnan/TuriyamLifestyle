import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import './App.css';
import ProdState from './context/ProdState';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Men from './components/Men'
import Adminpanel from './components/admin/Adminpanel';
import Adminlogin from './components/admin/Adminlogin';
import Admem from './components/admin/Admem';
import MemState from './context/MemState';
import Adrequest from './components/admin/Adrequest';
import Memrequest from './components/member/Memrequest';
import Startbusiness from './components/Startbusiness';
import Loginmember from './components/member/Loginmember';
import Membersbymember from './components/member/Membersbymember';
import Loginuser from './components/user/Loginuser';
import Signuser from './components/user/Signuser';
import Gen from './components/Gen';
import Women from './components/Women';
import Cart from './components/Cart';
import Adorders from './components/admin/Adorders';
import Verifymember from './components/member/Verifymember';
import Verifycode from './components/member/Verifycode';
import Forgotmember from './components/member/Forgotmember';
import Forgotcode from './components/member/Forgotcode';
import Terms from './components/Terms';
import Usefullinks from './components/Usefullinks';
function App() {

  return (
    <>
    <MemState>
    <ProdState>
    <Router>
    

      <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/men' element={<Men/>} />
      <Route exact path='/startbusiness' element={<Startbusiness/>} />
      <Route exact path='/adminlogin' element={<Adminlogin/>} />
      <Route exact path='/adminpanel' element={<Adminpanel/>} />
      <Route exact path='/adminpanel/member' element={<Admem/>} />
      <Route exact path='/adminpanel/request' element={<Adrequest/>} />
      <Route exact path='/memrequest' element={<Memrequest/>} />
      <Route exact path='/loginmember' element={<Loginmember/>} />
      <Route exact path='/membersbymember' element={<Membersbymember/>} />
      <Route exact path='/loginuser' element={<Loginuser/>} />
      <Route exact path='/signuser' element={<Signuser/>} />
      <Route exact path='/gen' element={<Gen/>} />
      <Route exact path='/women' element={<Women/>} />
      <Route exact path='/cart' element={<Cart/>} />
      <Route exact path='/adminpanel/oders' element={<Adorders/>} />
      <Route exact path='/verifymember' element={<Verifymember/>} />
      <Route exact path='/verifycode' element={<Verifycode/>} />
      <Route exact path='/forgotmember' element={<Forgotmember/>} />
      <Route exact path='/forgotcode' element={<Forgotcode/>} />
      <Route exact path='/termsofservice' element={<Terms/>} />
      <Route exact path='/usefullinks' element={<Usefullinks/>} />
      </Routes>
    
    
    </Router>
    </ProdState>
    </MemState>
    </>
  );
}

export default App;
