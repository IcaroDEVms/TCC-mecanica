import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CardLink.css';

const CardLink = ({ to, image, title, description }) => {
  return (
    <Link to={to} className="card-link">
      <div className="card">
        <div className="card-image-container">
          <img src={image} alt={title} className="card-image" />
        </div>
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
          <span className="card-action">Ver manual →</span>
        </div>
      </div>
    </Link>
  );
};

export default CardLink;