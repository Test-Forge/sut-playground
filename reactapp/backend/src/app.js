const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(bodyParser.json());

// Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/logs", require("./routes/logsRoutes"));
app.use("/api/checkout", require("./routes/checkoutRoutes"));

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the JSON Backend!");
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
