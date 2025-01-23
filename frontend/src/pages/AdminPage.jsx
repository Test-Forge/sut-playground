import React, { useState, useEffect } from "react";
import LogsTable from "../components/LogsTable";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import AlertPopover from "../components/AlertPopover";
import API from "../utils/api";
import "../styles/AdminPage.css";

const AdminPage = ({handleLogout}) => {
    const [logs, setLogs] = useState([]);
    const [analyticsData, setAnalyticsData] = useState(null);
    const [isLoadingLogs, setIsLoadingLogs] = useState(true);
    const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);

    const [alert, setAlert] = useState({ message: "", type: "", visible: false });
    const showAlert = (message, type = "info") => {
        setAlert({ message, type, visible: true });
        // Auto-close after 5 seconds
        setTimeout(() => setAlert({ ...alert, visible: false }), 5000);
    };

    const fetchAnalyticsData = async () => {
        try {
            setIsLoadingAnalytics(true);
            const response = await API.get("/analytics");
            setAnalyticsData(response.data);
        } catch (err) {
            console.error("Error fetching analytics data:", err);
            showAlert("Failed to fetch analytics data.", "error");
        } finally {
            setIsLoadingAnalytics(false);
        }
    };


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
            try {
                await API.post("/products/reset");
                showAlert("Products have been reset to their initial state.", "success");
                // Refresh logs
                await handleLogsRefresh();

                // Refresh analytics data
                await fetchAnalyticsData();
            } catch (err) {
                console.error("Error resetting products:", err);
                showAlert("Failed to reset products. Please try again.", "error");
            }
    };

    const handleResetCheckout = async () => {
            try {
                await API.post("/checkout/reset");
                showAlert("Checkout have been reset to their initial state.", "success");
                await handleLogsRefresh()

                // Clear analytics data temporarily
                setAnalyticsData(null);

                // Optionally refresh analytics data
                await fetchAnalyticsData();
            } catch (err) {
                console.error("Error resetting checkout:", err);
                showAlert("Failed to reset checkout. Please try again.", "error");
            }
    };

    const handleResetLogs = async () => {
            try {
                await API.post("/logs/reset");
                showAlert("Logs have been reset to their initial state.", "success");
                await handleLogsRefresh()
            } catch (err) {
                console.error("Error resetting logs:", err);
                showAlert("Failed to reset logs. Please try again.", "error");
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
                    <AnalyticsDashboard data={analyticsData} isLoading={isLoadingAnalytics} />
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
                        {alert.visible && (
                            <AlertPopover
                                message={alert.message}
                                type={alert.type}
                                onClose={() => setAlert({ ...alert, visible: false })}
                            />
                        )}
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
