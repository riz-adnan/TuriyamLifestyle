import React from 'react'
import {Link} from 'react-router-dom'
import './Adv.css'
const Adver = () => {
  return (
    <>
        <div role="main">





<div class="container marketing">

  <div class="row">
    <div class="col-lg-4">
      <img  className="rounded-circle" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKAbwwOYmmNTHCBtUJSc7QkqdiZ_B0hzMRwA&usqp=CAU" alt="Generic placeholder image" id="headimage" />
      <h2>TRUST</h2>
      <p>At Turiyam Lifestyles, trust is at the heart of our business. We strive to earn and maintain the confidence of our members through transparent, dependable, digital and member-centric financial solutions.</p>
      <p><Link to='/memrequest' class="btn btn-secondary" href="#" role="button">Become Member »</Link></p>
    </div>
    <div class="col-lg-4">
      <img className="rounded-circle" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjHIqTNoc-JxdwA55_Fa3FrqdNQAewGk1juA&usqp=CAU" alt="Generic placeholder image" id="headimage"/>
      <h2>GROWTH</h2>
      <p>We embrace growth as a fundamental value, constantly innovating and adapting to evolve with our members' needs. Our relentless pursuit of progress drives us to deliver cutting-edge solutions, ensuring mutual success and prosperity on the journey towards a thriving future.</p>
      <p><Link to='/memrequest' class="btn btn-secondary" href="#" role="button">Become Member »</Link></p>
    </div>
    <div class="col-lg-4">
      <img className="rounded-circle" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfEfsf5m2gMkEgsStMlYEdFSovm-_SVoH8uw&usqp=CAU" alt="Generic placeholder image" id="headimage"/>
      <h2>COMMITMENT</h2>
      <p>We are dedicated to providing unwavering support and personalized service, going above and beyond to exceed expectations and foster enduring relationships with our valued members.</p>
      <p><Link to='/memrequest' class="btn btn-secondary" href="#" role="button">Become Member »</Link></p>
    </div>
  </div>




  <hr class="featurette-divider"/>

  <div class="row featurette">
    <div class="col-md-7">
      <h2 class="featurette-heading">Online Growing Oppurtunity <span class="text-muted">Great Compensations.</span></h2>
      <p class="lead">Discover boundless online working opportunities with Turiyam Lifestyles. Our platform offers a diverse range of remote work options, connecting talented professionals with global projects and employers. Embrace flexibility, independence, and growth as you embark on a fulfilling and rewarding virtual career journey with us.</p>
    </div>
    <div class="col-md-5">
      <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgosSzQo4zdc3DDu_v_UIlG6mvCu8B-VrNJg&usqp=CAU" data-holder-rendered="true" id="downimage"/>
    </div>
  </div>

  <hr class="featurette-divider"/>

  <div class="row featurette">
    <div class="col-md-7 order-md-2">
      <h2 class="featurette-heading">Flexible Hours <span class="text-muted">See for yourself.</span></h2>
      <p class="lead">We believe in work-life balance, offering flexible hours to our valued team members. Embrace the freedom to choose your optimal working schedule, ensuring productivity and well-being go hand in hand. Join our dynamic workforce and experience the convenience of shaping your career on your own terms.</p>
    </div>
    <div class="col-md-5 order-md-1">
      <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDiHZXsfxmTpFp7_9huvHjHzJ2BYcfKJY3hQ&usqp=CAU" data-holder-rendered="true" id="downimage" />
    </div>
  </div>

  <hr class="featurette-divider"/>

  <div class="row featurette">
    <div class="col-md-7">
      <h2 class="featurette-heading">Easy Rank Promotions <span class="text-muted">More Benefits</span></h2>
      <p class="lead">At Turiyam Lifestyles, we value talent and dedication, providing a clear path for easy rank promotions. With our transparent performance evaluation and growth-oriented culture, you'll have the opportunity to advance and flourish within our organization. Join us, and let your ambition soar as you climb the ladder of success with ease.</p>
    </div>
    <div class="col-md-5">
      <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src="https://i.imgur.com/B2ZKkLx.jpeg" data-holder-rendered="true" id="downimage"/>
    </div>
  </div>

  <hr class="featurette-divider"/>

  

</div>



<footer class="container">
  <p class="float-right"><a href="#">Back to top</a></p>
  
</footer>
</div>
        <Link to='/memrequest'><button type="button" className="btn btn-dark btn-sm " id="posbtn">Become a Member</button></Link>

    </>
  )
}

export default Adver