import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from './slider';
import ContactForm from './Contact';

type HomePageProps = {
  // Define your prop types here if needed
};

const HomePage: React.FC<HomePageProps> = (props) => {
  const navigate = useNavigate();
  const slides = [
    { id: 1, imageUrl: 'https://images.pexels.com/photos/5053742/pexels-photo-5053742.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 2, imageUrl: 'https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 3, imageUrl: 'https://images.pexels.com/photos/4065152/pexels-photo-4065152.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 4, imageUrl: 'https://images.pexels.com/photos/4549408/pexels-photo-4549408.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ];
 
 
  const Feature = ({ title, description }: { title: string; description: string }) => (
    <div className="col-md-4 mb-4">
      <div
        className="feature-card p-4"
        style={{
          backgroundImage: 'url("https://cdn.pixabay.com/photo/2014/03/25/15/25/sticky-note-296778_640.png")', // Use 'backgroundImage' instead of 'background'
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '8px',
          height: '300px',
          color: '#000000',
          transition: 'transform 0.2s ease-in-out', 
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} 
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <h4 style={{ marginBottom: '50px' }}>{title}</h4>
      <p>{description}</p>
      </div>
    </div>
  );
  
  

  return (
    <div>
      {/* Navbar */}
      <section id="navbar" className="bg-dark text-light py-3">
        <nav className="navbar navbar-expand-lg navbar-light justify-content-center">
          <div className="container-fluid">
            <a className="navbar-brand text-light ms-auto" href="#">
              Task Master
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active text-light" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-light" href="#service">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-light"
                    onClick={() => navigate("/api/user/signup")}
                    style={{ cursor: "pointer" }} // Add cursor style
                  >
                    Sign Up
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-light"
                    onClick={() => navigate("/api/user/login")}
                    style={{ cursor: "pointer" }} // Add cursor style
                  >
                    Sign In
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>

      {/* Main Content with Gradient Background */}
      <div
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url("https://images.pexels.com/photos/7130476/pexels-photo-7130476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: 'calc(100vh - 114px)', // Adjusted for the navbar height
         
        }}
      >
        {/* Two-Column Layout: Carousel (Left) and Advertisement (Right) */}
        <section className="container py-5">
          <div className="row">
            {/* Carousel (Left) */}
            <div className="col-md-6">
              <Carousel>
                {slides.map((slide) => (
                  <div key={slide.id}>
                    <img src={slide.imageUrl} alt={`Slide ${slide.id}`} style={{ width: '500px', height:'500px' }} />
                  </div>
                ))}
              </Carousel>
            </div>

            {/* Advertisement (Right) */}
            <div className="col-md-6">
              <div className="text-center mb-4">
                <h1>Discover Our Task Master</h1><br></br>
                <h4>Manage your tasks efficiently with our Task Master.</h4><br></br>
                <p>"Empower your thoughts with our Digital Sticky Note App – a virtual canvas 
                  for your ideas, tasks, and inspirations. Unleash the simplicity of jotting down
                  notes and organizing your life in a visually appealing and 
                  intuitive way. With the convenience of a digital world and the charm of
                  handwritten notes, our app transforms your device into a versatile space for 
                  creativity and productivity. Embrace the future of note-taking and declutter your mind with
                  our Digital Sticky Note App – where ideas stick and inspiration flows."</p>
                {/* Add more content or an image for the advertisement */}
              </div>
            </div>
          </div>
        </section>
       
       {/* Feature Section */}
       <section
  className="container py-5"
  style={{
    backgroundColor: 'transparent',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    marginTop: '20px',
  }}
>
  <div className="row text-white">
    <h2 className="mb-4">Task Master Features</h2>
    <Feature
      title="Easy Task Management"
      description="Effortlessly manage your tasks with our intuitive interface."
    />
    <Feature
     title="User-friendly Interface"
     description="Enjoy a simple and intuitive user interface that makes task management a breeze. Stay productive without any learning curve."
    />
    <Feature
      title="Customizable Sticky Notes"
      description="Customize your sticky notes to stay organized."
    />
    {/* Add more features as needed */}
  </div>
</section>
<br></br><br></br><br></br><br></br><br></br>
      

     {/* Two-Column Layout: Feature Section (Left) and Contact Form (Right) */}
<section
  className="container py-5"
  style={{
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2)), url("https://assets-global.website-files.com/60252f4fc7403c99b2cadcb2/6399b6357ae48735f7e1ff90_1337229983-HowToWriteAnEngagingMessageForYourTarget-Audience-1920x1280-14122022.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="row">
    {/* Feature Section (Left) */}
    <div className="col-md-6">
      <div className="text-center mb-4 text-white"><br></br><br></br><br></br><br></br>
        <h2>Have Questions?</h2>
        <p>Contact us for inquiries and assistance.</p>
        <p>"Feel free to contact us. We're here to help."</p>
      </div>
      {/* You can add more content or an image for the feature section */}
    </div>
 
     <ContactForm /> 
  </div>
</section>
<br></br><br></br>

        {/* Footer */}
        <footer className="bg-dark text-light py-5">
          <div className="container">
            <div className="row">
              {/* Social Icons */}
              <div className="col-md-6">
                <h4>Connect With Us</h4>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-light">
                      <i className="fab fa-facebook"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-light">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-light">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  {/* Add more social icons as needed */}
                </ul>
              </div>

              {/* Contact Details */}
              <div className="col-md-6">
                <h4>Contact Us</h4>
                <p>
                  <i className="bi bi-geo-alt-fill"></i> 123 Street, Cityville, California
                </p>
                <p>
                  <i className="bi bi-envelope-fill"></i> taskmasterinfo@example.com
                </p>
                <p>
                  <i className="bi bi-phone-fill"></i> +123 456 7890
                </p>
              </div>
            </div>

            {/* Copyright */}
            <hr className="my-4 border-light" />
            <p className="mb-0 text-center">
              &copy; 2023 Task Master. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
