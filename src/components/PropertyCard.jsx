import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

function PropertyCard({ property, onAddToFavourites, isFavourite }) {
  // Parse the added date once
  const addedDate = useMemo(() => new Date(property.added), [property.added]);

  // Check if property was added in the last 30 days (pure, no Date.now())
  const isNew = useMemo(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    return addedDate > thirtyDaysAgo;
  }, [addedDate]);

  return (
    <div className="property-card">
      <div className="property-image">
        <img
          src={`${import.meta.env.BASE_URL}${property.picture.replace(/^\/+/, '')}`}
          alt={`${property.type} in ${property.location}`}
        />
        <div className="property-badge">
          <span className="type-badge">{property.type}</span>
          <span className="bed-badge">{property.bedrooms} bed</span>
          {isNew && <span className="new-badge">NEW</span>}
        </div>
      </div>

      <div className="property-content">
        <h3 className="property-title">{property.location}</h3>

        <div className="property-price">
          <span className="price-amount">
            £{property.price.toLocaleString()}
          </span>
          <span className="price-tenure">{property.tenure}</span>
        </div>

        <p className="property-description">
          {property.description.substring(0, 120)}...
        </p>

        <div className="property-meta">
          <span className="meta-item">📍 {property.postcode}</span>
          <span className="meta-item">
            📅 Added: {addedDate.toLocaleDateString('en-GB')}
          </span>
        </div>

        <div className="property-actions">
          <Link to={`/property/${property.id}`} className="btn btn-view">
            View Details
          </Link>

          <button
            onClick={() => onAddToFavourites(property)}
            className={`btn btn-fav ${isFavourite ? 'active' : ''}`}
          >
            {isFavourite ? '★ Saved' : '☆ Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;