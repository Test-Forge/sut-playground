const express = require("express");
const {
    getProducts,
    addProduct,
    editProduct,
    deleteProduct,
    resetProducts,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);
router.put("/:id", editProduct); // Update a specific product
router.delete("/:id", deleteProduct); // Delete a specific product
router.post("/reset", resetProducts);

module.exports = router;
