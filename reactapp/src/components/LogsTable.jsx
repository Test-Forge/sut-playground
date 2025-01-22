import React from "react";
import "../styles/LogsTable.css";

const LogsTable = ({ logs }) => {
    if (!logs.length) {
        return <p>No logs available.</p>;
    }

    return (
        <div className="logs-table-container">
            <table className="logs-table">
                <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>Action</th>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                {logs.map((log, index) => (
                    <tr key={index}>
                        <td>{new Date(log.timestamp).toLocaleString()}</td>
                        <td>{log.action}</td>
                        <td>{log.details}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogsTable;
