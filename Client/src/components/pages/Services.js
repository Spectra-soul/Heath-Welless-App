import React from 'react';
import { useCart } from '../../context/CartContext';

const Services = () => {
  const { addToCart } = useCart();

  const services = [
    {
      id: 1,
      name: 'Yoga & Meditation',
      description: 'Expert-led yoga and meditation sessions for all levels',
      price: 49.99,
      duration: '60 minutes',
      image: '/images/yoga.jpg',
      category: 'Yoga'
    },
    {
      id: 2,
      name: 'Nutrition Consultation',
      description: 'Personalized nutrition planning and dietary advice',
      price: 79.99,
      duration: '45 minutes',
      image: '/images/nutrition.jpg',
      category: 'Nutrition'
    },
    {
      id: 3,
      name: 'Mental Health Counseling',
      description: 'Professional mental health support and counseling',
      price: 89.99,
      duration: '50 minutes',
      image: '/images/mental-health.jpg',
      category: 'Mental Health'
    },
    {
      id: 4,
      name: 'Personal Training',
      description: 'One-on-one fitness training sessions',
      price: 69.99,
      duration: '60 minutes',
      image: '/images/fitness.jpg',
      category: 'Fitness'
    }
  ];

  const handleAddToCart = (service) => {
    addToCart({
      _id: service.id,
      name: service.name,
      price: service.price,
      image: service.image
    });
  };

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="hero-content">
          <h1>Our Services</h1>
          <p>Comprehensive wellness solutions tailored to your needs</p>
        </div>
      </section>

      <section className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <img src={service.image} alt={service.name} />
            <div className="service-content">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="service-details">
                <span className="price">${service.price}</span>
                <span className="duration">{service.duration}</span>
              </div>
              <button
                onClick={() => handleAddToCart(service)}
                className="btn-primary"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="why-choose-us">
        <h2>Why Choose Our Services?</h2>
        <div className="features-grid">
          <div className="feature">
            <i className="fas fa-user-md"></i>
            <h3>Expert Professionals</h3>
            <p>Certified and experienced wellness experts</p>
          </div>
          <div className="feature">
            <i className="fas fa-clock"></i>
            <h3>Flexible Scheduling</h3>
            <p>Sessions that fit your busy lifestyle</p>
          </div>
          <div className="feature">
            <i className="fas fa-hand-holding-heart"></i>
            <h3>Personalized Care</h3>
            <p>Programs tailored to your unique needs</p>
          </div>
          <div className="feature">
            <i className="fas fa-comments"></i>
            <h3>Ongoing Support</h3>
            <p>Continuous guidance and motivation</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services; 
 