import React from 'react'
import Categories from './Categories'
import Layout from './Layout'
import Placard from './Placard'
import Homecat from './Homecat'
import './procar.css'
const Home = () => {
  return (
    <div>
      <Layout title={"Home- Turiyam Lifestyles "}>
      <p className='testimonials'>
          Turiyam Lifestyle Pvt. Ltd.
        </p>
        <Placard/>
        <p className='testimonials'>
          Testimonials
        </p>
        <Homecat/>
        </Layout>
    </div>
  )
}

export default Home