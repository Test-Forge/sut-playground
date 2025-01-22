import React, { useState } from "react";
import "../styles/LoginForm.css";

const users = {
    user: { username: "user", password: "user", role: "user" },
    manager: { username: "manager", password: "manager", role: "manager" },
    admin: { username: "admin", password: "admin", role: "admin" },
};

const rolesInfo = [
    {
        role: "User",
        description: `
            Users are the primary consumers of the shop functionality. 
            They can browse through products, view detailed information about each product, 
            and add items to their cart. Once they have selected their desired products, 
            they can proceed to checkout to complete their purchase. 
        `,
        additionalFeatures: [
            "Products are loaded from the database. View product details, including name, category, and price.",
            "Add products to the cart. Name, price and quantity.",
            "Update quantities of products in the cart.",
            "Remove items from the cart before checkout.",
            "Proceed to checkout for completing purchases.",
        ],
        credentials: "Username: user | Password: user",
    },
    {
        role: "Manager",
        description: `
            Managers oversee product management. They have permissions to add new products, 
            edit existing product details, and delete products from the inventory. 
            This role ensures the product list is up-to-date and reflects accurate information.
        `,
        additionalFeatures: [
            "Add new products directly to the product list with unique IDs.",
            "Edit product details such as name, category, and price.",
            "Delete products that are no longer available or relevant.",
            "Manage the product list in real-time with seamless backend integration.",
            "Ensure logging for each action (add/edit/delete) for better tracking.",
        ],
        credentials: "Username: manager | Password: manager",
    },
    {
        role: "Admin",
        description: `
            Admins are responsible for high-level monitoring and analysis. 
            They have access to advanced administrative tools, including analytics dashboards 
            and logs of system activities. Admins ensure the system runs smoothly and make 
            data-driven decisions to improve overall performance.
        `,
        additionalFeatures: [
            "Access detailed analytics dashboards with sales and product insights.",
            "Monitor procurement history and sales trends.",
            "View logs of system activities, including user interactions and product updates.",
            "Reset the product list to its initial state when needed.",
            "Oversee user activity and system performance to ensure optimal operation.",
        ],
        credentials: "Username: admin | Password: admin",
    },
];

const LoginForm = ({ setLoggedInUser }) => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({ username: "", password: "" });

    const handleLogin = () => {
        let isValid = true;
        const newErrors = { username: "", password: "" };

        if (!credentials.username) {
            newErrors.username = "Username is required.";
            isValid = false;
        }

        if (!credentials.password) {
            newErrors.password = "Password is required.";
            isValid = false;
        }

        if (isValid) {
            const user = Object.values(users).find(
                (u) =>
                    u.username === credentials.username &&
                    u.password === credentials.password
            );

            if (user) {
                setLoggedInUser(user);
                setErrors({ username: "", password: "" });
            } else {
                newErrors.username = "Invalid username.";
                newErrors.password = "Invalid password.";
            }
        }

        setErrors(newErrors);
    };

    const handleLoginCard = (role) => {
        const user = users[role.toLowerCase()];
        if (user) {
            setLoggedInUser(user);
        }
    };

    return (
        <div className="login-page">
            <h1 className="login-heading">Welcome to the Interactive Form</h1>

            <div className="login-form">
                <div className="input-group">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={(e) =>
                            setCredentials((prev) => ({
                                ...prev,
                                username: e.target.value,
                            }))
                        }
                        className={`login-input ${
                            errors.username ? "input-error" : ""
                        }`}
                    />
                    {errors.username && (
                        <span className="error-message">{errors.username}</span>
                    )}
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) =>
                            setCredentials((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                        className={`login-input ${
                            errors.password ? "input-error" : ""
                        }`}
                    />
                    {errors.password && (
                        <span className="error-message">{errors.password}</span>
                    )}
                </div>
                <button onClick={handleLogin} className="login-button">
                    Login
                </button>
            </div>
            <div className="role-cards">
                {rolesInfo.map((info) => (
                    <div key={info.role} className="role-card" onClick={() => handleLoginCard(info.role)}>
                        <div className="role-card-header">
                            <h2>{info.role}</h2>
                        </div>
                        <div className="role-card-content">
                            <p>{info.description}</p>
                        </div>
                        <div className="role-card-features">
                            <ul>
                                {info.additionalFeatures.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="role-card-credentials">
                            <p className="credentials">{info.credentials}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoginForm;
