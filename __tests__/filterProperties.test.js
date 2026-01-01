import { filterProperties } from '../src/components/filters';
import propertiesData from '../src/data/properties.json';
import { test, expect, describe } from 'vitest';

describe('filterProperties', () => {
  const properties = propertiesData.properties;

  test('returns all properties when no filters', () => {
    const result = filterProperties(properties, {});
    expect(result.length).toBe(properties.length);
  });

  test('filters by type', () => {
    const result = filterProperties(properties, { type: 'House' });
    expect(result.every(p => p.type === 'House')).toBe(true);
  });

  test('filters by min and max price', () => {
    const result = filterProperties(properties, { minPrice: 400000, maxPrice: 800000 });
    expect(result.every(p => p.price >= 400000 && p.price <= 800000)).toBe(true);
  });

  test('filters by min and max bedrooms', () => {
    const result = filterProperties(properties, { minBedrooms: 3, maxBedrooms: 4 });
    expect(result.every(p => p.bedrooms >= 3 && p.bedrooms <= 4)).toBe(true);
  });

  test('filters by postcode', () => {
    const result = filterProperties(properties, { postcode: 'BR' });
    expect(result.every(p => p.postcode.startsWith('BR'))).toBe(true);
  });

  test('filters by date from', () => {
    const result = filterProperties(properties, { dateFrom: '2022-01-01' });
    const fromDate = new Date('2022-01-01');
    expect(result.every(p => new Date(p.added) >= fromDate)).toBe(true);
  });

  test('filters with multiple criteria', () => {
    const filters = {
      type: 'Flat',
      minPrice: 200000,
      maxPrice: 600000,
      minBedrooms: 2,
      postcode: 'SE10'
    };
    const result = filterProperties(properties, filters);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(p => 
      p.type === 'Flat' &&
      p.price >= 200000 && p.price <= 600000 &&
      p.bedrooms >= 2 &&
      p.postcode === 'SE10'
    )).toBe(true);
  });
});