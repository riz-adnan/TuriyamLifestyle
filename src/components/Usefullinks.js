import React from 'react'
import Layout from './Layout'
import {Link} from 'react-router-dom'
const Usefullinks = () => {
  return (
    <div>
        <Layout>
            <h2> <Link to ="/adminlogin" style={{color:"white" , marginBottom:"50px"}}> Admin Login</Link></h2>
            <h2> <Link to ="/memrequest" style={{color:"white" , marginBottom:"50px"} }> Members Signup</Link></h2>
            <h2> <Link to ="/loginmember" style={{color:"white" , marginBottom:"50px"}}> Member Login</Link></h2>
            <h2> <Link to ="/membersbymember" style={{color:"white" , marginBottom:"50px"}}> Member Stats</Link></h2>

        </Layout>
    </div>
  )
}

export default Usefullinks