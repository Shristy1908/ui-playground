import { Product } from "../types";
import "./ProductCard.css";

interface ProductCardProps {
	product: Product;
	onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
	const { name, price, rating, reviews, image, description, category } =
		product;

	const renderStars = (rating: number) => {
		return [...Array(5)].map((_, i) => (
			<span key={i} className={`star ${i < rating ? "filled" : "empty"}`}>
				★
			</span>
		));
	};

	const formatCategory = (category: string) => {
		return category
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	};

	return (
		<div className="product-card">
			<div className="product-image">
				<img src={image} alt={name} />
				<span className="product-category">{formatCategory(category)}</span>
			</div>
			<div className="product-info">
				<h3 className="product-name">{name}</h3>
				<div className="product-type">Category: {formatCategory(category)}</div>
				<p className="product-description">{description}</p>
				<div className="product-rating">
					<div className="stars">{renderStars(rating)}</div>
					<span className="reviews">({reviews})</span>
				</div>
				<div className="product-price">${price}</div>
				<div className="product-actions">
					<button className="buy-now">Buy now</button>
					<button className="add-to-cart" onClick={() => onAddToCart(product)}>
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
