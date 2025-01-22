const { readJSON } = require("../utils/jsonDB");

// Login User
exports.loginUser = (req, res) => {
    const { username, password } = req.body;
    const users = readJSON("users.json");

    const user = users.find((user) => user.username === username && user.password === password);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", role: user.role });
};

// Get Products
exports.getUsers = (req, res) => {
    try {
        const users = readJSON("users.json"); // Read from users.json
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: "Error fetching users" });
    }
};