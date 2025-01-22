import React, { useState } from "react";
import "../styles/WebElementsPage.css";

const WebElementsPage = () => {
    const [textInput, setTextInput] = useState("");
    const [textOutput, setTextOutput] = useState("");
    const [counter, setCounter] = useState(0);
    const [dropdownValue, setDropdownValue] = useState("");
    const [checkedOptions, setCheckedOptions] = useState([]);
    const [selectedRadio, setSelectedRadio] = useState("");
    const [toggleStatus, setToggleStatus] = useState("Enable");

    const handleCheckboxChange = (option) => {
        setCheckedOptions((prev) =>
            prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
        );
    };

    const handleToggle = () => {
        setToggleStatus((prev) => (prev === "Enable" ? "Disable" : "Enable"));
    };


    return (
        <div className="web-elements-page">
            <h1 className="web-elements-heading">Web Elements Playground</h1>
            <div className="web-elements-grid">
                {/* Text Input */}
                <div className="web-element">
                    <label htmlFor="text-input" className="web-element-label">
                        Text Input:
                    </label>
                    <input
                        id="text-input"
                        type="text"
                        placeholder="Type something..."
                        value={textInput}
                        onChange={(e) => {
                            const value = e.target.value;
                            setTextInput(value);
                            setTextOutput(value); // Dynamically update output
                        }}
                        className="web-element-input"
                    />
                    <p className="web-element-output">Output: {textOutput}</p>
                </div>

                {/* Counter */}
                <div className="web-element">
                    <label className="web-element-label">Counter:
                        <span className="web-element-counter-value">{counter}</span>
                    </label>
                    <div className="web-element-counter">
                        <button
                            onClick={() => setCounter(counter - 1)}
                            disabled={counter <= -5}
                            className="web-element-button"
                        >
                            -
                        </button>
                        <button
                            onClick={() => setCounter(counter + 1)}
                            disabled={counter >= 5}
                            className="web-element-button"
                        >
                            +
                        </button>
                        <button
                            onClick={() => setCounter(0)}
                            className="web-element-button-reset"
                        >
                            Reset
                        </button>
                    </div>
                    <p className="web-element-error">
                        {counter <= -5 && "Counter is too low!"}
                        {counter >= 5 && "Counter is too high!"}
                    </p>
                </div>

                {/* Dropdown */}
                <div className="web-element">
                    <label htmlFor="dropdown" className="web-element-label">
                        Dropdown:
                    </label>
                    <select
                        id="dropdown"
                        value={dropdownValue}
                        onChange={(e) => setDropdownValue(e.target.value)}
                        className="web-element-dropdown"
                    >
                        <option value="">Select an option</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                    </select>
                    <p className="web-element-output">Selected Value: {dropdownValue}</p>
                </div>

                {/* Checkbox */}
                <div className="web-element">
                    <label className="web-element-label">Checkbox Options:</label>
                    <div className="web-element-checkbox-group">
                        {["Option A", "Option B", "Option C"].map((option) => (
                            <label key={option} className="web-element-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={checkedOptions.includes(option)}
                                    onChange={() => handleCheckboxChange(option)}
                                    className="web-element-checkbox"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                    <p className="web-element-output">
                        Selected: {checkedOptions.length > 0 ? checkedOptions.join(", ") : "None"}
                    </p>
                </div>

                {/* Radio Buttons */}
                <div className="web-element">
                    <label className="web-element-label">Radio Buttons:</label>
                    <div className="web-element-radio-group">
                        <label className="web-element-radio-label">
                            <input
                                type="radio"
                                name="options"
                                value="Option A"
                                checked={selectedRadio === "Option A"}
                                onChange={(e) => setSelectedRadio(e.target.value)}
                                className="web-element-radio-input"
                            />
                            Option A
                        </label>
                        <label className="web-element-radio-label">
                            <input
                                type="radio"
                                name="options"
                                value="Option B"
                                checked={selectedRadio === "Option B"}
                                onChange={(e) => setSelectedRadio(e.target.value)}
                                className="web-element-radio-input"
                            />
                            Option B
                        </label>
                        <label className="web-element-radio-label">
                            <input
                                type="radio"
                                name="options"
                                value="Option C"
                                checked={selectedRadio === "Option C"}
                                onChange={(e) => setSelectedRadio(e.target.value)}
                                className="web-element-radio-input"
                            />
                            Option C
                        </label>
                    </div>
                    <p className="web-element-output">Selected Option: {selectedRadio}</p>
                </div>

                {/* Toggle Section */}
                <div className="web-element">
                    <label className="web-element-label">Enable/Disable Toggle:</label>
                    <div className="web-element-toggle-group">
                        <button
                            onClick={handleToggle}
                            className={`web-element-toggle-button ${
                                toggleStatus === "Disable" ? "disabled" : "enabled"
                            }`}
                        >
                            {toggleStatus}
                        </button>
                    </div>
                    <p className="web-element-output">
                        Current Status: {toggleStatus === "Enable" ? "Disabled" : "Enabled"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WebElementsPage;
