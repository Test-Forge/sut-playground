import React from "react";
import "../styles/CartSidebar.css";

const CartSidebar = ({ cart, isOpen, onClose, onDeleteItem, onUpdateQuantity, onClearCart, onCheckout }) => {
    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

    return (
        <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
            <button onClick={onClose} className="close-button">X</button>
            <h2>Cart</h2>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="cart-items">
                        {cart.map((product) => (
                            <li key={product.id} className="cart-item">
                                <button
                                    onClick={() => onDeleteItem(product.id)}
                                    className="delete-button"
                                >
                                    X
                                </button>
                                <div className="cart-item-details">
                                    <span>{product.name}</span>
                                    <span>${product.price.toFixed(2)}</span>
                                    <span className="cart-item-subtotal">
                                        Subtotal: ${(product.price * product.quantity).toFixed(2)}
                                    </span>
                                </div>
                                <div className="cart-item-quantity">
                                    <button
                                        onClick={() => onUpdateQuantity(product.id, product.quantity - 1)}
                                        disabled={product.quantity === 1}
                                        className="quantity-button"
                                    >
                                        -
                                    </button>
                                    <span>{product.quantity}</span>
                                    <button
                                        onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}
                                        className="quantity-button"
                                    >
                                        +
                                    </button>
                                </div>

                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${total.toFixed(2)}</h3>
                    <button onClick={onClearCart} className="clear-cart-button">
                        Clear Cart
                    </button>
                    <button onClick={onCheckout} className="checkout-button">
                        Checkout
                    </button>
                </>
            )}
        </div>
    );
};

export default CartSidebar;
