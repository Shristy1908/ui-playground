import { useState } from "react";

import { ShoppingCart } from "@phosphor-icons/react";
import { CartItem } from "../types";
import "./Navbar.css";
import logo from "../assets/logo.png";

interface NavbarProps {
	cartItems: CartItem[];
}

function Navbar({ cartItems }: NavbarProps) {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
	const totalPrice = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	return (
		<nav className="navbar">
			<div className="navbar-content">
				<h1><img src={logo} className="logo"/><span className="logo-title">SHOPPING CART</span></h1>
				<div className="cart-icon" onClick={() => setIsCartOpen(!isCartOpen)}>
					<ShoppingCart size={24} />
					{totalItems > 0 && <span className="cart-count">{totalItems}</span>}
					{isCartOpen && (
						<div className="cart-dropdown">
							{cartItems.length === 0 ? (
								<div>Your cart is empty</div>
							) : (
								<>
									{cartItems.map((item) => (
										<div key={item.id} className="cart-item">
											<img
												src={item.image}
												alt={item.title}
												className="cart-item-image"
											/>
											<div className="cart-item-details">
												<div className="cart-item-name">{item.title}</div>
												<div className="cart-item-price">${item.price}</div>
												<div className="cart-item-quantity">
													Quantity: {item.quantity}
												</div>
											</div>
										</div>
									))}
									<div className="cart-total">
										<span>Total:</span>
										<span>${totalPrice.toFixed(2)}</span>
									</div>
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
