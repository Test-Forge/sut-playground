const { readJSON } = require("../utils/jsonDB");

exports.getAnalytics = (req, res) => {
    try {
        const history = readJSON("history.json");
        const products = readJSON("products.json");
        const initial = readJSON("initialProducts.json");

        // Merge products and initialProducts with status
        const mergedProducts = initial.map((initialProduct) => {
            const currentProduct = products.find((p) => p.id === initialProduct.id);
            if (currentProduct) {
                if (
                    currentProduct.name !== initialProduct.name ||
                    currentProduct.category !== initialProduct.category ||
                    currentProduct.price !== initialProduct.price
                ) {
                    return { ...currentProduct, status: "updated",
                        originalName: initialProduct.name,
                        originalCategory: initialProduct.category,
                        originalPrice: initialProduct.price,
                    };
                }
                return { ...currentProduct, status: "initial" };
            }
            return { ...initialProduct, status: "deleted" };
        });

        // Add new products not in initialProducts
        products
            .filter((product) => !initial.some((p) => p.id === product.id))
            .forEach((product) => {
                mergedProducts.push({ ...product, status: "added" });
            });

        // Total Revenue
        const totalRevenue = history.reduce(
            (sum, entry) => sum + parseFloat(entry.totalAmount || 0),
            0
        );

        // Top Products
        const productSales = {};
        history.forEach((entry) => {
            entry.cart.forEach((item) => {
                productSales[item.id] = (productSales[item.id] || 0) + item.quantity;
            });
        });

        const topProducts = Object.entries(productSales)
            .map(([id, quantity]) => {
                const product = mergedProducts.find((p) => p.id === parseInt(id));
                if (product) {
                    return {
                        id: product.id,
                        name: product.name,
                        category: product.category,
                        quantity,
                    };
                }
                return { name: `Deleted Product (${id})`, category: "Unknown", quantity };
            })
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 3);

        // Sales by Category
        const salesByCategory = {};
        history.forEach((entry) => {
            entry.cart.forEach((item) => {
                const product = mergedProducts.find((p) => p.id === item.id);
                    salesByCategory[product.category] = (salesByCategory[product.category] || 0) + item.quantity;
            });
        });

        res.status(200).json({
            totalRevenue,
            topProducts,
            salesByCategory,
            mergedProducts,
        });
    } catch (err) {
        console.error("Error fetching analytics data:", err);
        res.status(500).json({ error: "Failed to fetch analytics data." });
    }
};