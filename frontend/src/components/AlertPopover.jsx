import React from "react";
import "../styles/AlertPopover.css";

const AlertPopover = ({ message, type, onClose }) => {
    return (
        <div className={`alert-popover alert-${type}`}>
            <p>{message}</p>
            <button onClick={onClose} className="alert-close-button">
                &times;
            </button>
        </div>
    );
};

export default AlertPopover;