import { useState } from 'react';
import PropertyCard from './PropertyCard';
import '../styles.css';

function Favourites({ favourites, onRemoveFromFavourites, onClearFavourites }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRemove = (propertyId) => {
    onRemoveFromFavourites(propertyId);
  };

  const handleClear = () => {
    if (favourites.length > 0) {
      setShowConfirm(true);
    }
  };

  const confirmClear = () => {
    onClearFavourites();
    setShowConfirm(false);
  };

  const cancelClear = () => {
    setShowConfirm(false);
  };

  const totalValue = favourites.reduce((sum, prop) => sum + prop.price, 0);

  return (
    <div className="favourites-sidebar">
      <div className="favourites-header">
        <h3>⭐ My Favourites</h3>
        <div className="favourites-stats">
          <span className="count-badge">{favourites.length} items</span>
          {favourites.length > 0 && (
            <span className="value-badge">
              £{totalValue.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {favourites.length === 0 ? (
        <div className="empty-favourites">
          <div className="empty-icon">⭐</div>
          <p>No favourite properties yet</p>
          <p className="empty-hint">
            Click the ☆ button on any property to save it here
          </p>
        </div>
      ) : (
        <>
          <div className="favourites-actions">
            <button 
              onClick={handleClear}
              className="btn btn-clear"
              disabled={favourites.length === 0}
            >
              🗑️ Clear All
            </button>
            
            <button 
              onClick={() => console.log('Export favourites')}
              className="btn btn-export"
            >
              📤 Export List
            </button>
          </div>

          <div className="favourites-list">
            {favourites.map(property => (
              <div key={property.id} className="favourite-item">
                <div className="favourite-content">
                  <img 
                    src={`/${property.picture}`} 
                    alt={property.type}
                    className="favourite-img"
                  />
                  <div className="favourite-info">
                    <h4>{property.type}</h4>
                    <p className="favourite-price">
                      £{property.price.toLocaleString()}
                    </p>
                    <p className="favourite-location">
                      {property.location.substring(0, 20)}...
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemove(property.id)}
                  className="remove-btn"
                  title="Remove from favourites"
                  aria-label="Remove from favourites"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="favourites-summary">
            <p>
              <strong>Total Properties:</strong> {favourites.length}
            </p>
            <p>
              <strong>Average Price:</strong> 
              £{Math.round(totalValue / favourites.length).toLocaleString()}
            </p>
          </div>
        </>
      )}

      {showConfirm && (
        <div className="confirm-modal">
          <div className="confirm-content">
            <h4>Clear all favourites?</h4>
            <p>This will remove {favourites.length} propert{favourites.length === 1 ? 'y' : 'ies'} from your list.</p>
            <div className="confirm-buttons">
              <button onClick={cancelClear} className="btn btn-cancel">
                Cancel
              </button>
              <button onClick={confirmClear} className="btn btn-confirm">
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favourites;