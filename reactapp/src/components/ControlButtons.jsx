import React from "react";
import "../styles/ControlButtons.css";

const ControlButtons = ({
                            loggedInUser,
                            isCartOpen,
                            setIsCartOpen,
                            setIsFormOpen,
                            handleLogout,
                            cart,
                            setEditingProduct, // Added for resetting editing state
                        }) => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="control-buttons">
            {loggedInUser.role === "manager" && (
                <>
                    <button
                        onClick={() => {
                            setEditingProduct(null); // Reset editing state
                            setIsFormOpen(true); // Open Add New Product form
                        }}
                        className="control-button"
                    >
                        Add New Product
                    </button>
                </>
            )}
            {loggedInUser.role === "user" && (
                <button onClick={() => setIsCartOpen((prev) => !prev)} className="control-button view-cart-button">
                    {isCartOpen ? "Close Cart" : "Open Cart"}
                    {totalItems > 0 && (
                        <span className="cart-counter">
                            {totalItems}
                        </span>
                    )}
                </button>
            )}
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </div>
    );
};

export default ControlButtons;
