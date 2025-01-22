import React, { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import ControlButtons from "../components/ControlButtons";
import CartSidebar from "../components/CartSidebar";
import ProductCardEdit from "../components/ProductCardEdit";
import AdminPage from "./AdminPage";
import API from "../utils/api";
import "../styles/FormPage.css";

const FormPage = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [filters, setFilters] = useState({ category: "", name: "", sort: "nameAsc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);

    useEffect(() => {
        if (loggedInUser) {
            const fetchProducts = async () => {
                try {
                    const response = await API.get("/products");
                    setProducts(response.data);
                } catch (err) {
                    console.error("Error fetching products:", err);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchProducts();
        }
    }, [loggedInUser]);

    if (!loggedInUser) {
        return <LoginForm setLoggedInUser={setLoggedInUser} />;
    }

    if (loggedInUser.role === "admin") {
        return <AdminPage handleLogout={() => setLoggedInUser(null)} />;
    }

    if (isLoading) {
        return <div className="form-page">Loading products...</div>;
    }

    const handleAddProduct = async (newProduct) => {
        try {
            const newProductWithId = {
                ...newProduct,
                id: Math.max(...products.map((p) => p.id), 0) + 1,
            };
            const response = await API.post("/products", newProductWithId);
            setProducts([...products, response.data]);
            setIsFormOpen(false);
            alert("Product added successfully!");
        } catch (err) {
            console.error("Error adding product:", err);
            alert("Failed to add product. Please try again.");
        }
    };

    const handleUpdateProduct = async (updatedProduct) => {
        try {
            await API.put(`/products/${updatedProduct.id}`, updatedProduct);
            const updatedProducts = products.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            );
            setProducts(updatedProducts);
            setIsFormOpen(false);
            alert("Product updated successfully!");
        } catch (err) {
            console.error("Error updating product:", err);
            alert("Failed to update product. Please try again.");
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await API.delete(`/products/${id}`);
            const updatedProducts = products.filter((product) => product.id !== id);
            setProducts(updatedProducts);
            alert("Product deleted successfully!");
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("Failed to delete product. Please try again.");
        }
    };

    const handleCheckout = async () => {
        try {
            const payload = {
                cart,
                totalAmount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
            };

            await API.post("/checkout", payload);
            alert("Checkout successful!");
            setCart([]); // Clear the cart after checkout
        } catch (err) {
            console.error("Error during checkout:", err);
            alert("Failed to process checkout. Please try again.");
        }
    };

    const filteredProducts = products
        .filter((product) => (filters.category ? product.category === filters.category : true))
        .filter((product) =>
            filters.name ? product.name.toLowerCase().includes(filters.name.toLowerCase()) : true
        )
        .sort((a, b) => {
            if (filters.sort === "priceAsc") return a.price - b.price;
            if (filters.sort === "priceDesc") return b.price - a.price;
            if (filters.sort === "nameAsc") return a.name.localeCompare(b.name);
            if (filters.sort === "nameDesc") return b.name.localeCompare(a.name);
            return 0;
        });

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="form-page">
            <h1>Welcome, {loggedInUser.role}</h1>

            <ControlButtons
                loggedInUser={loggedInUser}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                setIsFormOpen={setIsFormOpen}
                handleLogout={() => setLoggedInUser(null)}
                setEditingProduct={setEditingProduct}
                cart={cart}
            />

            <Filters filters={filters} setFilters={setFilters} />
            <div className="products-grid">
                {paginatedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        loggedInUser={loggedInUser}
                        handleEditProduct={(product) => {
                            setEditingProduct(product);
                            setIsFormOpen(true);
                        }}
                        handleDeleteProduct={handleDeleteProduct}
                        handleAddToCart={(product) =>
                            setCart((prev) =>
                                prev.some((item) => item.id === product.id)
                                    ? prev.map((item) =>
                                        item.id === product.id
                                            ? { ...item, quantity: item.quantity + 1 }
                                            : item
                                    )
                                    : [...prev, { ...product, quantity: 1 }]
                            )
                        }
                    />

                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={setCurrentPage}
            />
            <CartSidebar
                cart={cart}
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onDeleteItem={(id) => setCart((prev) => prev.filter((item) => item.id !== id))} // Deletes an item from the cart
                onUpdateQuantity={(id, quantity) =>
                    setCart((prev) =>
                        prev.map((item) =>
                            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
                        )
                    )
                } // Updates item quantity
                onClearCart={() => setCart([])} // Clears all items from the cart
                onCheckout={ handleCheckout }
            />
            {isFormOpen && (
                <ProductCardEdit
                    onClose={() => setIsFormOpen(false)}
                    onAddProduct={handleAddProduct}
                    onUpdateProduct={handleUpdateProduct}
                    editingProduct={editingProduct}
                    lastProductId={Math.max(...products.map((p) => p.id), 0)} // Pass the last product ID
                />


            )}
        </div>
    );
};

export default FormPage;
