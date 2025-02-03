import React, { useState, useEffect } from 'react';
import './home.css';
import {Link} from 'react-router-dom'



const Home = () => {
    return (
      <>
        
        <div className="App">
            <header className="header">
                <div className="container">
                <img src='/Brim_med1.png' alt='education image' className='homeimgbm' style={{ width: '70px', height: 'auto' }}/>
                    <nav>
                        <ul className="nav-links">
                            <li className='home'><a href="#home">Home</a></li>
                            <li className='home'><a href="#about">About Us</a></li>
                            <li className='home'><a href="#courses">Courses</a></li>
                            <li className='home'><a href="#teachers">Our Teachers</a></li>
                            <li className='home'><a href="#contact">Contact Us</a></li>
                        </ul>
                    </nav>
                    <div className='divsignin'><Link to="/Login" className='signinhome'>Sign in</Link></div>
                    
                </div>
            </header>

            <section className="banner" id="home">
                <div className="container">
                <h1 className='divh11'>WHERE EVERY STUDENT IS A </h1>
                <h1 className='divh12'>GENIUS </h1>
                <h1 className='divh13'>IN THE </h1>
                <h1 className='divh14'>MAKING </h1>
                <p className='pbanner'>BrimMed Academy is your gateway to academic excellence. Our personalized approach to learning empowers students to unlock their full potential and achieve success.</p>
                </div>
            </section>

            <section className="about" id="about">
                <div className="container">
                    <h2>About Us</h2>
                    <p>BrimMed Academy, established on June 18, 2024, is your gateway to academic excellence. Our personalized approach to learning empowers students to unlock their full potential and achieve success. Specializing in online courses, our academy offers high-quality programs accessible from anywhere to meet the educational needs of every student. With our innovative methods and continuous support, we are committed to providing top-tier education that prepares students to excel in their studies and beyond.</p>
                </div>
            </section>

            <section className="courses" id="courses">
                <div className="container">
                    <h2>Popular Courses</h2>
                    <div className="course-list">
                    <div className="course">
    <h3>Mathematics</h3>
    <p>Dive into the world of numbers, equations, and problem-solving. Our Mathematics course covers everything from algebra to calculus, ensuring a comprehensive understanding of mathematical concepts.</p>
</div>
<div className="course">
    <h3>Biology</h3>
    <p>Explore the wonders of life and living organisms. Our Biology course delves into genetics, ecology, and human biology, providing a thorough grounding in the life sciences.</p>
</div>
<div className="course">
    <h3>Physics</h3>
    <p>Unravel the mysteries of the physical world. Our Physics course covers mechanics, electromagnetism, and modern physics, helping students grasp the fundamental principles of the universe.</p>
</div>
<div className="course">
    <h3>Chemistry</h3>
    <p>Discover the elements and compounds that make up our world. Our Chemistry course offers an in-depth study of chemical reactions, bonding, and molecular structure, essential for understanding material science.</p>
</div>

                    </div>
                </div>
            </section>

            <section className="teachers" id="teachers">
            <div className="container">
    <h2>Our Teachers</h2>
    <div className="teacher-list">
        <div className="teacher">
            <img src="prloubna.png" alt="Loubna Elfaquih" className="teacher-photo"/>
            <h3>Khadija Benjelloun</h3>
            <p className='elf'>Pr.Khadija Benjelloun has over 10 years of experience in teaching mathematics at the high school level. She is passionate about helping students understand complex concepts through innovative teaching methods.</p>
            <p className='loumat'>Maths</p>
        </div>
        <div className="teacher">
            <img src="prsara.jpg" alt="Sara Sekkate" className="teacher-photo"/>
            <h3 style={{marginTop:'3px'}}>Amina Moussaoui</h3>
            <p className='sekk'>Pr.Amina Moussaoui is a dedicated biology teacher with a keen interest in environmental sciences. Her engaging lessons inspire students to explore the wonders of the natural world.</p>
            <p className='sekkmat' >Biology</p>
        </div>
        <div className="teacher">
            <img src="prazmi.jpg" alt="Mohamed Azmi" className="teacher-photo"/>
            <h3 style={{marginTop:'30px'}}>Youssef El Kabbaj</h3>
            <p className='azmi'>Pr.Youssef El Kabbaj brings a wealth of knowledge in physics and chemistry. His hands-on approach to teaching helps students grasp difficult concepts with ease.</p>
            <p className='azmat'>Physics & Chemistry</p>
        </div>
    </div>
</div>

            </section>

            <section className="testimonials" id="testimonials">
                <div className="container">
                    <h2>What Students Say</h2>
                    <div className="testimonial-list">
                    <div className="testimonial">
    <p>“Thanks to BrimMed Academy's Math and Science track, I conquered complex equations with ease. Their supportive teachers made all the difference.”</p>
    
</div>
<div className="testimonial">
    <p>“BrimMed Academy's SVT Sciences track made biology come alive for me. Their engaging sessions and dedicated teachers fueled my passion for science.”</p>
   
</div>
<div className="testimonial">
    <p>“BrimMed Academy made science fascinating! With their support, I tackled Physics and Chemistry effortlessly. Their guidance and resources were key in acing my exams.”</p>
    
</div>

                    </div>
                </div>
            </section>

            <footer className="footer" id='contact'>
                <div className="container">
                    <div className="footer-info">
                        <p className='footcont'>Contact Info</p>
                        <p>+212603423781</p>
                        <p>Brimmedacademy@Genius.com</p>
                        <p>Morocco , Casablanca Bernoussi </p>
                    </div>
                    <p>&copy; 2024 BrimMed Academy All Right Reserved</p>
                </div>
            </footer>
        </div>
    
      </>
    )
  }
  
  export default Home
