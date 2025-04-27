import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h2>Your Journey to Wellness Starts Here</h2>
          <p>Discover personalized wellness programs designed to improve your physical and mental health.</p>
          <Link to="/services" className="btn-primary">Explore Our Services</Link>
        </div>
      </section>

      <section className="featured-programs">
        <h2>Featured Wellness Programs</h2>
        <div className="program-cards">
          <div className="card">
            <img src="/images/yoga.jpg" alt="Yoga Class" />
            <h3>Yoga & Meditation</h3>
            <p>Find balance and inner peace with our expert-led yoga and meditation sessions.</p>
            <Link to="/services#yoga" className="btn-secondary">Learn More</Link>
          </div>
          <div className="card">
            <img src="/images/nutrition.jpg" alt="Nutrition Counseling" />
            <h3>Nutrition Planning</h3>
            <p>Get personalized diet plans and nutrition advice from certified dietitians.</p>
            <Link to="/services#nutrition" className="btn-secondary">Learn More</Link>
          </div>
          <div className="card">
            <img src="/images/mental-health.jpg" alt="Mental Health Support" />
            <h3>Mental Health Support</h3>
            <p>Access resources and professional guidance for mental wellbeing.</p>
            <Link to="/services#mental-health" className="btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Start Your Wellness Journey?</h2>
        <p>Join our community and get access to personalized wellness programs.</p>
        <Link to="/register" className="btn-primary">Sign Up Now</Link>
      </section>
    </>
  );
};

export default Home; 
 