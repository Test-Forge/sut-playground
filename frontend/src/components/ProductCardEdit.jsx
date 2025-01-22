import React, { useState, useEffect } from "react";
import "../styles/ProductCardEdit.css";

const ProductCardEdit = ({ onClose, onAddProduct, onUpdateProduct, editingProduct, lastProductId }) => {
    const [product, setProduct] = useState({
        id: lastProductId + 1,
        name: "",
        category: "",
        price: "",
    });

    useEffect(() => {
        if (editingProduct) {
            setProduct(editingProduct); // Pre-fill form for editing
        } else {
            // Reset to default for adding a new product
            setProduct({ id: lastProductId + 1, name: "", category: "", price: "" });
        }
    }, [editingProduct, lastProductId]);

    const handleSave = () => {
        if (editingProduct) {
            onUpdateProduct(product); // Update existing product
        } else {
            onAddProduct(product); // Add new product
        }
        onClose(); // Close the form
    };

    return (
        <>
            <div className="overlay" onClick={onClose}></div> {/* Overlay */}
            <div className="product-edit-form">
                <h2>{editingProduct ? `Edit Product: ID ${product.id}` : "Add New Product"}</h2>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    className="edit-input"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={product.category}
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    className="edit-input"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e) =>
                        setProduct({ ...product, price: parseFloat(e.target.value) })
                    }
                    className="edit-input"
                />
                <div className="edit-buttons">
                    <button onClick={handleSave} className="save-button">
                        {editingProduct ? "Update" : "Add"}
                    </button>
                    <button onClick={onClose} className="cancel-button">
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductCardEdit;
