import React from "react";
import "../styles/ProductCard.css";

const ProductCard = ({ product, loggedInUser, handleEditProduct, handleDeleteProduct, handleAddToCart }) => {
    return (
        <div className="product-card">
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <div className="card-buttons">
                {loggedInUser.role === "manager" && (
                    <>
                        <button onClick={() => handleEditProduct(product)} className="edit-button">
                            Edit
                        </button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="delete-button">
                            Delete
                        </button>
                    </>
                )}
                {loggedInUser.role === "user" && (
                    <button onClick={() => handleAddToCart(product)} className="add-cart-button">
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
