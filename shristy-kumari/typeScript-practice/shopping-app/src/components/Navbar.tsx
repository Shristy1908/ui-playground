import { ShoppingCart } from "@phosphor-icons/react";
import { CartItem } from "../types";
import "./Navbar.css";

interface NavbarProps {
	cartItems: CartItem[];
}

function Navbar({ cartItems }: NavbarProps) {
	const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<nav className="navbar">
			<div className="navbar-content">
				<h1>Shopping Cart</h1>
				<div className="cart-icon">
					<ShoppingCart size={24} />
					{totalItems > 0 && <span className="cart-count">{totalItems}</span>}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
