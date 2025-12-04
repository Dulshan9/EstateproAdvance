import React from "react";
import { useParams } from "react-router-dom";
import propertiesData from "../data/properties.json";
import ImageGallery from "../components/ImageGallery";

export default function PropertyPage({ favourites, onAddToFavourites }) {
  const { id } = useParams();
  const property = propertiesData.properties.find(p => p.id === id);

  if (!property) {
    return <div>Property not found</div>;
  }

  const isFavourite = favourites?.some(f => f.id === property.id);

  return (
    <div className="property-page">
      <div className="property-header">
        <div>
          <h1>{property.type} in {property.location}</h1>
          <p className="property-price">£{property.price.toLocaleString()} • {property.tenure}</p>
          <p>{property.bedrooms} bedrooms • {property.postcode}</p>
        </div>
        {onAddToFavourites && (
          <button
            onClick={() => onAddToFavourites(property)}
            className={`btn btn-fav ${isFavourite ? 'active' : ''}`}
            style={{ fontSize: '1.5rem' }}
          >
            {isFavourite ? '★ Saved' : '☆ Save'}
          </button>
        )}
      </div>

      <ImageGallery images={property.images} />

      <div className="property-tabs">
        <h2>Description</h2>
        <p>{property.description}</p>
        <p><strong>Location:</strong> {property.location}</p>
        <p><strong>Added:</strong> {new Date(property.added).toLocaleDateString('en-GB')}</p>
      </div>

      <div className="property-tabs">
        <h2>Location Map</h2>
        <iframe
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: '8px' }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
        />
      </div>
    </div>
  );
}