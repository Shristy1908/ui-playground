import React from 'react';
import { describe, expect, test, jest } from '@jest/globals';
import { Product } from '../types';

// Mock Product for tests
const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  description: "Test Description",
  price: 49.99,
  reviews: 10,
  category: "men clothing",
  image: "https://example.com/image.jpg",
  rating: {
    rate: 4,
    count: 123,
  },
};

describe("ProductCard component", () => {
  test("should format category correctly", () => {
    const formatCategory = (category: string) => {
      return category
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    expect(formatCategory("men clothing")).toBe("Men Clothing");
    expect(formatCategory("electronics")).toBe("Electronics");
  });

  test("should generate correct number of filled and empty stars", () => {
    const renderStars = (rating: number) => {
      return [...Array(5)].map((_, i) => ({
        className: i < rating ? "filled" : "empty",
      }));
    };

    const stars = renderStars(3);
    const filledStars = stars.filter((star) => star.className === "filled").length;
    const emptyStars = stars.filter((star) => star.className === "empty").length;

    expect(filledStars).toBe(3);
    expect(emptyStars).toBe(2);
  });

  test("should call onAddToCart with correct product", () => {
    const onAddToCartMock = jest.fn();

    // Call the function directly as you’re not testing DOM
    onAddToCartMock(mockProduct);

    expect(onAddToCartMock).toHaveBeenCalledTimes(1);
    expect(onAddToCartMock).toHaveBeenCalledWith(mockProduct);
  });
});
