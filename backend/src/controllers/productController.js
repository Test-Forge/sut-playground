const { readJSON, writeJSON } = require("../utils/jsonDB");
const { saveLog } = require("../utils/logging");

// Get Products
exports.getProducts = (req, res) => {
    try {
        const products = readJSON("products.json");
        res.status(200).json(products);
    } catch (err) {
        saveLog("Error reading products.json", err);
        res.status(500).json({ error: "Error fetching products" });
    }
};

// Add Product
exports.addProduct = (req, res) => {
    const products = readJSON("products.json");
    const newProduct = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        ...req.body,
    };

    products.push(newProduct);
    writeJSON("products.json", products);
    saveLog("ADD_PRODUCT", `Added product with ID: ${newProduct.id}`);
    res.status(201).json(newProduct);
};

// Edit Product
exports.editProduct = (req, res) => {
    try {
        const products = readJSON("products.json");
        const productId = parseInt(req.params.id);

        if (isNaN(productId)) {
            saveLog("EDIT_PRODUCT", "Invalid product ID provided");
            return res.status(400).json({ error: "Invalid product ID" });
        }

        const productIndex = products.findIndex((p) => p.id === productId);

        if (productIndex === -1) {
            saveLog("EDIT_PRODUCT", `Product with ID: ${productId} not found`);
            return res.status(404).json({ error: "Product not found" });
        }

        products[productIndex] = { ...products[productIndex], ...req.body };
        writeJSON("products.json", products);
        saveLog("EDIT_PRODUCT", `Edited product with ID: ${products[productIndex].id}`);
        res.status(200).json(products[productIndex]);
    } catch (err) {
        saveLog("EDIT_PRODUCT", `Error editing product: ${err}`);
        res.status(500).json({ error: "Error editing product" });
    }
};

// Delete Product
exports.deleteProduct = (req, res) => {
    try {
        const products = readJSON("products.json");
        const productId = parseInt(req.params.id);

        if (isNaN(productId)) {
            saveLog("DELETE_PRODUCT", "Invalid product ID provided");
            return res.status(400).json({ error: "Invalid product ID" });
        }

        const updatedProducts = products.filter((product) => product.id !== productId);
        writeJSON("products.json", updatedProducts);
        saveLog("DELETE_PRODUCT", `Deleted product with ID: ${productId}`);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        saveLog("DELETE_PRODUCT", `Error deleting product: ${err}`);
        res.status(500).json({ error: "Error deleting product" });
    }
};

// Reset Products
exports.resetProducts = (req, res) => {
    try {
        const initialProducts = readJSON("initialProducts.json");
        writeJSON("products.json", initialProducts);
        saveLog("RESET_PRODUCTS", "Reset all products to the initial state.");
        res.status(200).json({ message: "Products reset to initial state." });
    } catch (err) {
        console.error("Error resetting products:", err);
        saveLog("RESET_PRODUCTS", `Error resetting products: ${err}`);
        res.status(500).json({ error: "Failed to reset products." });
    }
};
