import React, { useState } from "react";
import SearchForm from "../components/SearchForm";
import PropertyCard from "../components/PropertyCard";
import propertiesData from "../data/properties.json";
import { filterProperties } from "../components/filters";

export default function SearchPage({ favourites, onAddToFavourites }) {
  const [results, setResults] = useState(propertiesData.properties);

  function handleSearch(filters) {
    const filtered = filterProperties(propertiesData.properties, filters);
    setResults(filtered);
  }

  return (
    <div>
      <h1>Property Search</h1>
      <SearchForm onSearch={handleSearch} />

      {results.length === 0 ? (
        <div className="no-results">
          <p>No properties found matching your criteria.</p>
          <p>Try adjusting your search filters.</p>
        </div>
      ) : (
        <div className="properties-grid">
          {results.map(property => {
            const isFavourite = favourites.some(f => f.id === property.id);
            return (
              <PropertyCard
                key={property.id}
                property={property}
                onAddToFavourites={onAddToFavourites}
                isFavourite={isFavourite}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}