import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CardLink.css'; // estilização separada

const CardLink = ({ to, image, title }) => {
  return (
    <Link to={to} className="card-link">
      <div className="card">
        <img src={image} alt={title} className="card-image" />
        <div className="card-title">{title}</div>
      </div>
    </Link>
  );
};

export default CardLink;
