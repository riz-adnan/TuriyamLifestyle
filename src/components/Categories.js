import React from 'react'
import './Cat.css'
import {Link} from 'react-router-dom'
const Categories = () => {
  return (
    <>
  

<div id="carouselExampleCaptions" class="carousel slide" data-mdb-ride="carousel">
  <div class="carousel-indicators">
    <button
      type="button"
      data-mdb-target="#carouselExampleCaptions"
      data-mdb-slide-to="0"
      class="active"
      aria-current="true"
      aria-label="Slide 1"
    ></button>
    <button
      type="button"
      data-mdb-target="#carouselExampleCaptions"
      data-mdb-slide-to="1"
      aria-label="Slide 2"
    ></button>
    <button
      type="button"
      data-mdb-target="#carouselExampleCaptions"
      data-mdb-slide-to="2"
      aria-label="Slide 3"
    ></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://img.freepik.com/free-photo/dark-haired-woman-with-red-lipstick-smiles-leans-stand-with-clothes-holds-package-pink-background_197531-17609.jpg" class="d-block w-100" alt="Wild Landscape"/>
      <div class="carousel-caption  d-md-block">
      <Link to='/Women'><button type="button" class="btn btn-warning btn-rounded" >Explore Women's Collection</button></Link>
      </div>
      
    </div>
    <div class="carousel-item">
      <img src="https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man_158538-19393.jpg" class="d-block w-100" alt="Camera"/>
      <div class="carousel-caption  d-md-block">
      <Link to='Men'><button type="button" class="btn btn-warning btn-rounded" >Explore Men's Collection</button></Link>
      </div>
      
    </div>
    <div class="carousel-item">
      <img src="https://media.istockphoto.com/id/1282335242/photo/traveler-suitcase-and-luggage-with-travel-accessories-and-items-preparing-for-travel.jpg?s=612x612&w=0&k=20&c=YWI3sexRwYLYIz7r67e1enEX4WfquWssn2B62Cni74E=" class="d-block w-100" alt="Exotic Fruits"/>
      <div class="carousel-caption  d-md-block">
      <Link to='/Gen'><button type="button" class="btn btn-warning btn-rounded" >Explore General Collection</button></Link>
      </div>
      
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-mdb-target="#carouselExampleCaptions" data-mdb-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-mdb-target="#carouselExampleCaptions" data-mdb-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>






    </>
        
        
    
  )
}

export default Categories