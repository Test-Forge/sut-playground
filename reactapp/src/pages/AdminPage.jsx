import React, { useState, useEffect } from "react";
import LogsTable from "../components/LogsTable";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import API from "../utils/api";
import "../styles/AdminPage.css";

const AdminPage = ({handleLogout}) => {
    const [logs, setLogs] = useState([]);
    const [analyticsData, setAnalyticsData] = useState(null);
    const [isLoadingLogs, setIsLoadingLogs] = useState(true);
    const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await API.get("/logs");
                setLogs(response.data);
            } catch (err) {
                console.error("Error fetching logs:", err);
            } finally {
                setIsLoadingLogs(false);
            }
        };

        const fetchAnalytics = async () => {
            try {
                const response = await API.get("/analytics");
                setAnalyticsData(response.data);
            } catch (err) {
                console.error("Error fetching analytics data:", err);
            } finally {
                setIsLoadingAnalytics(false);
            }
        };

        fetchLogs();
        fetchAnalytics();
    }, []);

    const handleResetProducts = async () => {
        if (window.confirm("Are you sure you want to reset the product list to its initial state?")) {
            try {
                await API.post("/products/reset");
                alert("Products have been reset to their initial state.");
                await handleLogsRefresh()
            } catch (err) {
                console.error("Error resetting products:", err);
                alert("Failed to reset products. Please try again.");
            }
        }
    };

    const handleResetCheckout = async () => {
        if (window.confirm("Are you sure you want to reset the product list to its initial state?")) {
            try {
                await API.post("/checkout/reset");
                alert("Checkout have been reset to their initial state.");
                await handleLogsRefresh()
            } catch (err) {
                console.error("Error resetting checkout:", err);
                alert("Failed to reset checkout. Please try again.");
            }
        }
    };

    const handleResetLogs = async () => {
        if (window.confirm("Are you sure you want to reset the product list to its initial state?")) {
            try {
                await API.post("/logs/reset");
                alert("Logs have been reset to their initial state.");
                await handleLogsRefresh()
            } catch (err) {
                console.error("Error resetting logs:", err);
                alert("Failed to reset logs. Please try again.");
            }
        }
    };

    const handleLogsRefresh = async () => {
        setIsLoadingLogs(true);
        try {
            const response = await API.get("/logs");
            setLogs(response.data);
        } catch (err) {
            console.error("Error refreshing logs:", err);
        } finally {
            setIsLoadingLogs(false);
        }
    };

    return (
        <div className="admin-page">
            <h1>Admin Dashboard</h1>
            <section className="analytics-section">
                <h2>Analytics Dashboard</h2>
                {isLoadingAnalytics ? (
                    <p>Loading analytics...</p>
                ) : analyticsData ? (
                    //<p> Analytics data loaded. </p>
                    <AnalyticsDashboard data={analyticsData}/>
                ) : (
                    <p>No analytics data available.</p>
                )}
            </section>

            <section className="logs-section">
                <h2>Logs and Monitoring</h2>
                {/*                <button onClick={handleLogsRefresh} className="refresh-button">
                    refresh
                </button>*/}
                {isLoadingLogs ? (
                    <p>Loading logs...</p>
                ) : logs.length > 0 ? (
                    <LogsTable logs={logs}/>
                ) : (
                    <p>No logs available.</p>
                )}
            </section>

            <section className="reset-section">
                <h2>Reset Shop</h2>
                <div className="button-container">
                    <div className="left-buttons">
                        <button onClick={handleResetProducts} className="reset-button">Reset Products</button>
                        <button onClick={handleResetCheckout} className="reset-button">Reset Checkout</button>
                        <button onClick={handleResetLogs} className="reset-button">Reset Logs</button>
                    </div>
                    <div className="right-button">
                        <button onClick={handleLogout} className="admin-logout-button">Logout</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminPage;
