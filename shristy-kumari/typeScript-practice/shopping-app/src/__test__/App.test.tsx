import { describe, test, expect } from '@jest/globals';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  reviews: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface CartItem extends Product {
  quantity: number;
}

// --- Helper Functions extracted from App logic ---

function handleAddToCart(cartItems: CartItem[], product: Product): CartItem[] {
  const existingItem = cartItems.find((item) => item.id === product.id);
  if (existingItem) {
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...cartItems, { ...product, quantity: 1 }];
}

function filterProducts(
  products: Product[],
  selectedCategory: string,
  selectedPriceRange: string,
  selectedRating: number,
  searchQuery: string
): Product[] {
  return products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesRating = selectedRating === 0 || product.rating.rate >= selectedRating;

    let matchesPrice = true;
    if (selectedPriceRange !== "all") {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      if (max) {
        matchesPrice = product.price >= min && product.price <= max;
      } else {
        matchesPrice = product.price >= min;
      }
    }

    return matchesSearch && matchesCategory && matchesRating && matchesPrice;
  });
}

// --- Mock Data ---
const mockProduct: Product = {
  id: 1,
  title: "Smartphone",
  description: "A cool phone",
  price: 299,
  reviews: 10,
  category: "electronics",
  image: "img.jpg",
  rating: { rate: 4.5, count: 100 },
};

const anotherProduct: Product = {
  id: 2,
  title: "Sneakers",
  description: "Running shoes",
  price: 99,
  reviews: 5,
  category: "fashion",
  image: "img2.jpg",
  rating: { rate: 4.2, count: 80 },
};

// --- Tests ---
describe("handleAddToCart", () => {
    test("adds a new item to an empty cart", () => {
    const result = handleAddToCart([], mockProduct);
    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(1);
  });

  test("increments quantity if item already exists", () => {
    const cart: CartItem[] = [{ ...mockProduct, quantity: 1 }];
    const result = handleAddToCart(cart, mockProduct);
    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(2);
  });
});

describe("filterProducts", () => {
  const products = [mockProduct, anotherProduct];

  test("returns all products if no filters", () => {
    const result = filterProducts(products, "All Categories", "all", 0, "");
    expect(result).toHaveLength(2);
  });

  test("filters by category", () => {
    const result = filterProducts(products, "fashion", "all", 0, "");
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe("fashion");
  });

  test("filters by rating", () => {
    const result = filterProducts(products, "All Categories", "all", 4.4, "");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Smartphone");
  });

  test("filters by search query", () => {
    const result = filterProducts(products, "All Categories", "all", 0, "sneakers");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Sneakers");
  });

  test("filters by price range", () => {
    const result = filterProducts(products, "All Categories", "100-300", 0, "");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Smartphone");
  });
});

describe("clearFilters (conceptually)", () => {
    test("should reset all filters to default values", () => {
    let selectedCategory = "electronics";
    let selectedPriceRange = "100-500";
    let selectedRating = 4;
    let searchQuery = "shoes";

    // Simulate clearFilters
    selectedCategory = "All Categories";
    selectedPriceRange = "all";
    selectedRating = 0;
    searchQuery = "";

    expect(selectedCategory).toBe("All Categories");
    expect(selectedPriceRange).toBe("all");
    expect(selectedRating).toBe(0);
    expect(searchQuery).toBe("");
  });
});
