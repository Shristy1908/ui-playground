import "./Sidebar.css";

interface SidebarProps {
	selectedCategory: string;
	setSelectedCategory: (category: string) => void;
	selectedPriceRange: string;
	setPriceRange: (range: string) => void;
	selectedRating: number;
	setRating: (rating: number) => void;
	clearFilters: () => void;
}

function Sidebar({
	selectedCategory,
	setSelectedCategory,
	selectedPriceRange,
	setPriceRange,
	selectedRating,
	setRating,
	clearFilters,
}: SidebarProps) {
	const categories = [
		"All Categories",
		"Electronics",
		"Jewelry",
		"Men's Clothing",
		"Women's Clothing",
	];

	const priceRanges = [
		{ id: "all", label: "All Prices" },
		{ id: "0-50", label: "Under $50" },
		{ id: "50-100", label: "$50 - $100" },
		{ id: "100-500", label: "$100 - $500" },
		{ id: "500+", label: "Over $500" },
	];

	return (
		<aside className="sidebar">
			<div className="filter-header">
				<h2>Filters</h2>
				<button className="clear-filters" onClick={clearFilters}>
					Clear Filters
				</button>
			</div>

			<section className="filter-section">
				<h2>Categories</h2>
				<ul>
					{categories.map((category) => (
						<li key={category}>
							<label>
								<input
									type="radio"
									name="category"
									checked={selectedCategory === category}
									onChange={() => setSelectedCategory(category)}
								/>
								{category}
							</label>
						</li>
					))}
				</ul>
			</section>

			<section className="filter-section">
				<h2>Price Range</h2>
				<ul>
					{priceRanges.map((range) => (
						<li key={range.id}>
							<label>
								<input
									type="radio"
									name="price"
									checked={selectedPriceRange === range.id}
									onChange={() => setPriceRange(range.id)}
								/>
								{range.label}
							</label>
						</li>
					))}
				</ul>
			</section>

			<section className="filter-section">
				<h2>Rating</h2>
				<ul>
					{[4, 3, 2, 1].map((stars) => (
						<li key={stars}>
							<label>
								<input
									type="radio"
									name="rating"
									checked={selectedRating === stars}
									onChange={() => setRating(stars)}
								/>
								{[...Array(stars)].map((_, i) => (
									<span key={i} className="star filled">
										★
									</span>
								))}
								{[...Array(5 - stars)].map((_, i) => (
									<span key={i} className="star empty">
										★
									</span>
								))}
								& Up
							</label>
						</li>
					))}
				</ul>
			</section>
		</aside>
	);
}

export default Sidebar;
