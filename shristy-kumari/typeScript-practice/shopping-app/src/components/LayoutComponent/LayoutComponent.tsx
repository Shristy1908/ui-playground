import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Product, CartItem } from "../../types";
import "./LayoutComponent.css";

function LayoutComponent() {
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedCategory, setSelectedCategory] = useState("All Categories");
	const [selectedPriceRange, setPriceRange] = useState("all");
	const [selectedRating, setRating] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	useEffect(() => {
		fetch("https://fakestoreapi.com/products")
			.then((res) => res.json())
			.then((data) => setProducts(data))
			.catch((error) => console.error("Error fetching products:", error));
	}, []);

	const clearFilters = () => {
		setSelectedCategory("All Categories");
		setPriceRange("all");
		setRating(0);
		setSearchQuery("");
	};

	const handleAddToCart = (product: Product) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((item) => item.id === product.id);
			if (existingItem) {
				return prevItems.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
			return [...prevItems, { ...product, quantity: 1 }];
		});
	};

	const filteredProducts = products.filter((product) => {
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

	return (
		<div>
			<Navbar cartItems={cartItems} />
			<div className="app">
				<Sidebar
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
					selectedPriceRange={selectedPriceRange}
					setPriceRange={setPriceRange}
					selectedRating={selectedRating}
					setRating={setRating}
					clearFilters={clearFilters}
				/>
				<main className="product-container">
					<div className="search-bar">
						<input
							type="text"
							placeholder="Search products..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<div className="product-grid">
						{filteredProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								onAddToCart={handleAddToCart}
							/>
						))}
					</div>
				</main>
			</div>
		</div>
	);
}
export default LayoutComponent;
