import { describe, test, expect } from "@jest/globals";

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

describe("Cart logic", () => {
	test("adds a new item to an empty cart", () => {
		const cartItems: CartItem[] = [];
		const existingItem = cartItems.find((item) => item.id === mockProduct.id);
		let result: CartItem[];

		if (existingItem) {
			result = cartItems.map((item) =>
				item.id === mockProduct.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
		} else {
			result = [...cartItems, { ...mockProduct, quantity: 1 }];
		}

		expect(result).toHaveLength(1);
		expect(result[0].quantity).toBe(1);
	});

	test("increments quantity if item already exists", () => {
		const cartItems: CartItem[] = [{ ...mockProduct, quantity: 1 }];
		const existingItem = cartItems.find((item) => item.id === mockProduct.id);
		let result: CartItem[];

		if (existingItem) {
			result = cartItems.map((item) =>
				item.id === mockProduct.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
		} else {
			result = [...cartItems, { ...mockProduct, quantity: 1 }];
		}

		expect(result).toHaveLength(1);
		expect(result[0].quantity).toBe(2);
	});
});

describe("Product filtering logic", () => {
	const products: Product[] = [mockProduct, anotherProduct];

	test("returns all products if no filters", () => {
		const selectedCategory: string = "All Categories";
		const selectedPriceRange: string = "all";
		const selectedRating = 0;
		const searchQuery = "";

		const filtered = products.filter((product) => {
			const matchesSearch =
				product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.description.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesCategory =
				selectedCategory === "All Categories" ||
				product.category.toLowerCase() === selectedCategory.toLowerCase();

			const matchesRating =
				selectedRating === 0 || product.rating.rate >= selectedRating;

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

		expect(filtered).toHaveLength(2);
	});

	test("filters by category", () => {
		const selectedCategory: string = "fashion";

		const filtered = products.filter(
			(product) =>
				product.category.toLowerCase() === selectedCategory.toLowerCase()
		);

		expect(filtered).toHaveLength(1);
		expect(filtered[0].category).toBe("fashion");
	});

	test("filters by rating", () => {
		const selectedRating = 4.4;

		const filtered = products.filter(
			(product) => product.rating.rate >= selectedRating
		);

		expect(filtered).toHaveLength(1);
		expect(filtered[0].title).toBe("Smartphone");
	});

	test("filters by search query", () => {
		const searchQuery = "sneakers";

		const filtered = products.filter(
			(product) =>
				product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.description.toLowerCase().includes(searchQuery.toLowerCase())
		);

		expect(filtered).toHaveLength(1);
		expect(filtered[0].title).toBe("Sneakers");
	});

	test("filters by price range", () => {
		const selectedPriceRange: string = "100-300";

		const filtered = products.filter((product) => {
			const [min, max] = selectedPriceRange.split("-").map(Number);
			return product.price >= min && product.price <= max;
		});

		expect(filtered).toHaveLength(1);
		expect(filtered[0].title).toBe("Smartphone");
	});
});

describe("clearFilters (conceptual test)", () => {
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
