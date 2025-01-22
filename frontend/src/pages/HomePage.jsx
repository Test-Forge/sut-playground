import React from "react";
import "../styles/global.css";
import "../styles/HomePage.css";

const HomePage = () => {
    return (
        <div className="page">
            <h1 className="heading">Welcome to the System Under Test</h1>
            <p className="text">Explore the menu above to test various web element scenarios.</p>
        <div className="home-page">
            <div className="description-card">
                <p>
                    This application is designed for both beginners and advanced testers to
                    practice interacting with various web elements in a real-world-like
                    environment. It also features an Interactive Form for managing products
                    with role-based functionality.
                </p>
                <h3>Key Features:</h3>
                <ul>
                    <li>
                        <strong>Web Elements Playground:</strong> Explore basic and advanced
                        web elements, including shadow DOM, checkboxes, and dynamic toggles.
                    </li>
                    <li>
                        <strong>Interactive Form:</strong> Add, edit, and delete products with
                        seamless backend integration. Role-specific functionality ensures
                        precise user management.
                    </li>
                    <li>
                        <strong>Admin Dashboard:</strong> Analyze product performance,
                        procurement history, and sales trends. Functionality integrated in the
                        interactive form as part of role management.
                    </li>
                </ul>
                <p>
                    Whether you’re learning to interact with web elements manually or
                    automating tests, this application provides a perfect playground for
                    improving your skills.
                </p>
            </div>
        </div>
        </div>
    );
};

export default HomePage;
