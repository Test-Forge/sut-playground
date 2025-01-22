const express = require("express");
const { saveCheckout, resetCheckout } = require("../controllers/checkoutController");

const router = express.Router();

router.post("/", saveCheckout);
router.post("/reset", resetCheckout);

module.exports = router;
