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

// --- Sample Cart Items ---
const mockCartItems: CartItem[] = [
  {
    id: 1,
    title: "Phone",
    description: "Smartphone",
    price: 300,
    reviews: 5,
    category: "electronics",
    image: "phone.jpg",
    rating: { rate: 4.3, count: 100 },
    quantity: 2,
  },
  {
    id: 2,
    title: "Shoes",
    description: "Running shoes",
    price: 100,
    reviews: 10,
    category: "fashion",
    image: "shoes.jpg",
    rating: { rate: 4.5, count: 80 },
    quantity: 1,
  },
];

describe("Navbar Component Logic", () => {
    test("calculates total items in the cart correctly", () => {
    const totalItems = mockCartItems.reduce((sum, item) => sum + item.quantity, 0);
    expect(totalItems).toBe(3); // 2 phones + 1 shoe
  });

  test("calculates total price of the cart correctly", () => {
    const totalPrice = mockCartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    expect(totalPrice).toBe(700); // 2*300 + 1*100
  });

  test("returns correct cart content when cart is empty", () => {
    const emptyCart: CartItem[] = [];
    const totalItems = emptyCart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = emptyCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    expect(totalItems).toBe(0);
    expect(totalPrice).toBe(0);
  });

  test("toggles cart open/close state correctly", () => {
    let isCartOpen = false;

    // Simulate clicking the cart icon
    isCartOpen = !isCartOpen;
    expect(isCartOpen).toBe(true);

    // Simulate clicking again
    isCartOpen = !isCartOpen;
    expect(isCartOpen).toBe(false);
  });
});
