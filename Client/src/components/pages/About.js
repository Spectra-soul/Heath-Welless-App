import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="hero-content">
          <h1>About Health & Wellness</h1>
          <p>Your trusted partner in achieving optimal health and wellbeing</p>
        </div>
      </section>

      <section className="about-content">
        <div className="mission-vision">
          <div className="mission">
            <h2>Our Mission</h2>
            <p>To empower individuals to take control of their health through comprehensive wellness programs, expert guidance, and supportive community.</p>
          </div>
          <div className="vision">
            <h2>Our Vision</h2>
            <p>To create a world where everyone has access to the resources and support they need to live their healthiest, most fulfilling lives.</p>
          </div>
        </div>

        <div className="values">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <i className="fas fa-heart"></i>
              <h3>Holistic Care</h3>
              <p>We believe in treating the whole person, not just symptoms.</p>
            </div>
            <div className="value-card">
              <i className="fas fa-users"></i>
              <h3>Community</h3>
              <p>Building strong, supportive relationships for lasting change.</p>
            </div>
            <div className="value-card">
              <i className="fas fa-star"></i>
              <h3>Excellence</h3>
              <p>Committed to providing the highest quality care and service.</p>
            </div>
            <div className="value-card">
              <i className="fas fa-lightbulb"></i>
              <h3>Innovation</h3>
              <p>Continuously improving and adapting to serve you better.</p>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h2>Our Expert Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="/images/team/expert1.jpg" alt="Dr. Sarah Johnson" />
              <h3>Dr. Sarah Johnson</h3>
              <p>Wellness Director</p>
            </div>
            <div className="team-member">
              <img src="/images/team/expert2.jpg" alt="Michael Chen" />
              <h3>Michael Chen</h3>
              <p>Nutrition Specialist</p>
            </div>
            <div className="team-member">
              <img src="/images/team/expert3.jpg" alt="Emma Rodriguez" />
              <h3>Emma Rodriguez</h3>
              <p>Yoga Instructor</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Start Your Wellness Journey Today</h2>
        <p>Join our community and transform your life with expert guidance and support.</p>
        <Link to="/services" className="btn-primary">Explore Our Services</Link>
      </section>
    </div>
  );
};

export default About; 
 