import React from "react";
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "../styles/AnalyticsDashboard.css";

// Register components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AnalyticsDashboard = ({ data }) => {

    const barOptions = {
        maintainAspectRatio: true, // Maintain fixed aspect ratio
        responsive: true, // Ensure responsiveness
        plugins: {
            legend: { display: false }, // Optional: Hide legend for compactness
        },
    };

    const pieOptions = {
        maintainAspectRatio: true,
        responsive: true,
        plugins: {
            legend: { position: "right" },
        },
    };


    const barData = {
        labels: Object.keys(data.salesByCategory),
        datasets: [
            {
                label: "Sales by Category",
                data: Object.values(data.salesByCategory),
                backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
            },
        ],
    };

    const pieData = {
        labels: data.topProducts.map((product) => product.name),
        datasets: [
            {
                data: data.topProducts.map((product) => product.quantity),
                backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
            },
        ],
    };

    return (
        <div className="analytics-dashboard">
            <h2>Total Revenue: ${data.totalRevenue.toFixed(2)}</h2>
            <div className="chart-container">
                <h3>Sales by Category</h3>
                <Bar data={barData} key={`bar-${JSON.stringify(barData)}`} options={barOptions}/>
            </div>
            <div className="chart-container">
                <h3>Top Products</h3>
                <Pie data={pieData} key={`pie-${JSON.stringify(pieData)}`} options={pieOptions}/>
            </div>
        </div>

    );
};

export default AnalyticsDashboard;
