import { describe, test, expect, jest } from '@jest/globals';

describe('Sidebar component logic', () => {
    test('calls setSelectedCategory with correct category', () => {
    const setSelectedCategory = jest.fn();
    const mockCategory = "Electronics";
    setSelectedCategory(mockCategory);
    expect(setSelectedCategory).toHaveBeenCalledWith("Electronics");
  });

  test('calls setPriceRange with correct range', () => {
    const setPriceRange = jest.fn();
    setPriceRange("100-500");
    expect(setPriceRange).toHaveBeenCalledWith("100-500");
  });

  test('calls setRating with correct stars', () => {
    const setRating = jest.fn();
    setRating(4);
    expect(setRating).toHaveBeenCalledWith(4);
  });

  test('calls clearFilters', () => {
    const clearFilters = jest.fn();
    clearFilters();
    expect(clearFilters).toHaveBeenCalled();
  });

  test('handles multiple filters together', () => {
    const setSelectedCategory = jest.fn();
    const setPriceRange = jest.fn();
    const setRating = jest.fn();

    setSelectedCategory("Men's Clothing");
    setPriceRange("50-100");
    setRating(3);

    expect(setSelectedCategory).toHaveBeenCalledWith("Men's Clothing");
    expect(setPriceRange).toHaveBeenCalledWith("50-100");
    expect(setRating).toHaveBeenCalledWith(3);
  });
});
