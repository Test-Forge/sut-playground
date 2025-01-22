const express = require("express");
const { getUsers, loginUser } = require("../controllers/userController");
const router = express.Router();

// Routes
router.get("/", getUsers);
router.post("/login", loginUser);

module.exports = router;
