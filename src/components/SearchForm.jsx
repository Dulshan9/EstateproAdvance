import React, { useState } from "react";
import "../styles.css"; // assuming you have global styles there

export default function SearchForm({ onSearch }) {
  const [form, setForm] = useState({
    type: "Any",
    minPrice: "",
    maxPrice: "",
    minBeds: "Any",
    maxBeds: "Any",
    dateAfter: "",
    postcode: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedFilters = {
      type: form.type === "Any" ? "" : form.type,
      minPrice: form.minPrice ? Number(form.minPrice) : "",
      maxPrice: form.maxPrice ? Number(form.maxPrice) : "",
      minBedrooms: form.minBeds === "Any" ? "" : Number(form.minBeds),
      maxBedrooms:
        form.maxBeds === "Any" || form.maxBeds === "5+" ? "" : Number(form.maxBeds),
      dateFrom: form.dateAfter || "",
      postcode: form.postcode.trim(),
    };

    onSearch(cleanedFilters);
  };

  const bedOptions = ["Any", "1", "2", "3", "4", "5", "5+"];

  return (
    <div className="search-form-container">
      <h2 className="search-title">Find Your Perfect Property</h2>

      <form className="modern-search-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Property Type */}
          <div className="form-field">
            <label htmlFor="type">Property Type</label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option value="Any">Any Type</option>
              <option value="House">House</option>
              <option value="Flat">Flat</option>
            </select>
          </div>

          {/* Min Price */}
          <div className="form-field">
            <label htmlFor="minPrice">Min Price (£)</label>
            <div className="input-with-icon">
              <span className="input-icon">£</span>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                placeholder="e.g. 200000"
                value={form.minPrice}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Max Price */}
          <div className="form-field">
            <label htmlFor="maxPrice">Max Price (£)</label>
            <div className="input-with-icon">
              <span className="input-icon">£</span>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="e.g. 850000"
                value={form.maxPrice}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Bedrooms Min */}
          <div className="form-field">
            <label htmlFor="minBeds">Bedrooms (min)</label>
            <select
              id="minBeds"
              name="minBeds"
              value={form.minBeds}
              onChange={handleChange}
            >
              {bedOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Bedrooms Max */}
          <div className="form-field">
            <label htmlFor="maxBeds">Bedrooms (max)</label>
            <select
              id="maxBeds"
              name="maxBeds"
              value={form.maxBeds}
              onChange={handleChange}
            >
              {bedOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Added After */}
          <div className="form-field">
            <label htmlFor="dateAfter">Added After</label>
            <input
              type="date"
              id="dateAfter"
              name="dateAfter"
              value={form.dateAfter}
              onChange={handleChange}
            />
          </div>

          {/* Postcode */}
          <div className="form-field">
            <label htmlFor="postcode">Postcode Area</label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              placeholder="e.g. BR1, NW1, SE10"
              value={form.postcode}
              onChange={handleChange}
              maxLength={4}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="search-btn">
            <span className="btn-icon">🔍</span>
            Search Properties
          </button>

          <button
            type="button"
            className="clear-btn"
            onClick={() =>
              setForm({
                type: "Any",
                minPrice: "",
                maxPrice: "",
                minBeds: "Any",
                maxBeds: "Any",
                dateAfter: "",
                postcode: "",
              })
            }
          >
            Clear Filters
          </button>
        </div>
      </form>
    </div>
  );
}