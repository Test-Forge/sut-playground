const { readJSON, writeJSON } = require("../utils/jsonDB");
const { saveLog } = require("../utils/logging");

exports.saveCheckout = (req, res) => {
    try {
        const { cart, cartAmount } = req.body;
        const history = readJSON("history.json");
        const totalAmount = cartAmount.toFixed(2)

        const newEntry = {
            id: history.length + 1,
            date: new Date().toISOString(),
            cart,
            totalAmount,
        };

        history.push(newEntry);
        writeJSON("history.json", history);

        saveLog("CHECKOUT", `User completed a purchase. Total: ${totalAmount}`);
        res.status(200).json({ message: "Checkout saved successfully", entry: newEntry });
    } catch (err) {
        saveLog("CHECKOUT_ERROR", `Error during checkout: ${err}`);
        res.status(500).json({ error: "Failed to save checkout" });
    }
};

// Reset Checkout
exports.resetCheckout = (req, res) => {
    try {
        writeJSON("history.json", []);
        saveLog("RESET_CHECKOUT", "Reset all history to the initial state.");
        res.status(200).json({ message: "Products reset to initial state." });
    } catch (err) {
        console.error("Error resetting products:", err);
        saveLog("RESET_CHECKOUT", `Error resetting history: ${err}`);
        res.status(500).json({ error: "Failed to reset history." });
    }
};
