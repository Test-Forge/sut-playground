import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WebElementsPage from "./pages/WebElementsPage";
import AdvancedElementsPage from "./pages/AdvancedWebElementPage";
import FormPage from "./pages/FormPage";
import Layout from "./components/Layout";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route element={<Layout />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/webelements" element={<WebElementsPage />} />
                    <Route path="/advanced" element={<AdvancedElementsPage />} />
                    <Route path="/form/*" element={<FormPage />} /> {/* Nested routes for FormPage */}
                </Route>
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </Router>
    );
};

export default App;
