export const filterProperties = (properties, filters) => {
  if (!filters || Object.keys(filters).length === 0) {
    return properties;
  }

  return properties.filter(property => {
    if (filters.type && filters.type !== 'any' && property.type !== filters.type) {
      return false;
    }

    if (filters.minPrice && property.price < Number(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && property.price > Number(filters.maxPrice)) {
      return false;
    }

    if (filters.minBedrooms && property.bedrooms < Number(filters.minBedrooms)) {
      return false;
    }
    if (filters.maxBedrooms && property.bedrooms > Number(filters.maxBedrooms)) {
      return false;
    }

    if (filters.postcode && !property.postcode.toLowerCase().includes(filters.postcode.toLowerCase())) {
      return false;
    }

    // Date filter using ISO string
    if (filters.dateFrom || filters.dateTo) {
      const propDate = new Date(property.added);
      
      if (filters.dateFrom) {
        const fromDate = new Date(filters.dateFrom);
        if (propDate < fromDate) return false;
      }
      
      if (filters.dateTo) {
        const toDate = new Date(filters.dateTo);
        if (propDate > toDate) return false;
      }
    }

    return true;
  });
};

export const validateFilters = (filters) => {
  const errors = [];
  
  if (filters.minPrice && filters.maxPrice && Number(filters.minPrice) > Number(filters.maxPrice)) {
    errors.push('Minimum price cannot be greater than maximum price');
  }
  
  if (filters.minBedrooms && filters.maxBedrooms && Number(filters.minBedrooms) > Number(filters.maxBedrooms)) {
    errors.push('Minimum bedrooms cannot be greater than maximum bedrooms');
  }
  
  if (filters.dateFrom && filters.dateTo && new Date(filters.dateFrom) > new Date(filters.dateTo)) {
    errors.push('Start date cannot be after end date');
  }
  
  if (filters.postcode && !/^[A-Za-z0-9]{2,4}$/.test(filters.postcode.trim())) {
    errors.push('Please enter a valid postcode area (e.g., BR5, NW1)');
  }
  
  return errors;
};