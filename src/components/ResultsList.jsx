import { Link } from 'react-router-dom';

function ResultsList({ properties, favourites, onAddToFavourites }) {
  if (properties.length === 0) {
    return (
      <div className="no-results">
        <p>No properties found matching your criteria.</p>
        <p>Try adjusting your search filters.</p>
      </div>
    );
  }

  return (
    <div className="results-list">
      <h2>Found {properties.length} propert{properties.length === 1 ? 'y' : 'ies'}</h2>
      <div className="properties-grid">
        {properties.map(property => {
          const isFavourite = favourites.some(fav => fav.id === property.id);
          return (
            <div key={property.id} className="property-card">
              <img src={property.picture} alt={property.type} />
              <div className="property-card-content">
                <h3>{property.type} in {property.location}</h3>
                <div className="property-price">
                  £{property.price.toLocaleString()}
                </div>
                <div className="property-meta">
                  <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
                  <span>•</span>
                  <span>{property.postcode}</span>
                </div>
                <p className="property-description">
                  {property.description.substring(0, 100)}...
                </p>
                <div className="property-actions">
                  <Link to={`/property/${property.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                  <button
                    onClick={() => onAddToFavourites(property)}
                    className={`btn ${isFavourite ? 'btn-fav-active' : 'btn-fav'}`}
                  >
                    {isFavourite ? '★ Saved' : '☆ Save'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResultsList;