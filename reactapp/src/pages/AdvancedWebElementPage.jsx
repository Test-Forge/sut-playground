import React, { useState } from "react";
import "../styles/AdvancedWebElementsPage.css";

const AdvancedWebElementsPage = () => {
    const [textInput, setTextInput] = useState("");
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

    const handleRadioChange = (option) => {
        setSelectedRadio(option);
    };

    const handleToggle = () => {
        setToggleStatus((prev) => (prev === "Enable" ? "Disable" : "Enable"));
    };

    return (
        <div className="advanced-web-elements-page">
            <h1 className="advanced-web-elements-heading">Advanced Web Elements Playground</h1>
            <div className="advanced-web-elements-grid">
                {/* Shadow DOM Text Input */}
                <div className="advanced-web-element shadow-host">
                    <label htmlFor="text-input" className="advanced-web-element-label">
                        Shadow DOM Input:
                    </label>
                    <input
                        id="text-input"
                        type="text"
                        placeholder="Type here..."
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        className="advanced-web-element-input"
                    />
                    <p className="advanced-web-element-output">Output: {textInput}</p>
                </div>

                {/* Counter */}
                <div className="advanced-web-element shadow-host">
                    <label className="advanced-web-element-label">Counter:</label>
                    <span className="advanced-web-element-counter-value">{counter}</span>
                    <div className="advanced-web-element-counter">
                        <button
                            onClick={() => setCounter(counter - 1)}
                            disabled={counter <= -5}
                            className="advanced-web-element-button"
                        >
                            -
                        </button>

                        <button
                            onClick={() => setCounter(counter + 1)}
                            disabled={counter >= 5}
                            className="advanced-web-element-button"
                        >
                            +
                        </button>
                        <button
                            onClick={() => setCounter(0)}
                            className="advanced-web-element-button-reset"
                        >
                            Reset
                        </button>
                    </div>
                    {counter <= -5 && <p className="advanced-web-element-error">Too low!</p>}
                    {counter >= 5 && <p className="advanced-web-element-error">Too high!</p>}
                </div>

                {/* Dropdown */}
                <div className="advanced-web-element shadow-host">
                    <label htmlFor="dropdown" className="advanced-web-element-label">
                        Dropdown:
                    </label>
                    <select
                        id="dropdown"
                        value={dropdownValue}
                        onChange={(e) => setDropdownValue(e.target.value)}
                        className="advanced-web-element-dropdown"
                    >
                        <option value="">Select an option</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                    </select>
                    <p className="advanced-web-element-output">Selected: {dropdownValue}</p>
                </div>

                {/* Checkbox Options */}
                <div className="advanced-web-element shadow-host">
                    <label className="advanced-web-element-label">Checkbox Group:</label>
                    <div className="advanced-web-element-checkbox-group">
                        {["Option A", "Option B", "Option C"].map((option) => (
                            <label key={option} className="advanced-web-element-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={checkedOptions.includes(option)}
                                    onChange={() => handleCheckboxChange(option)}
                                    className="advanced-web-element-checkbox"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                    <p className="advanced-web-element-output">
                        Selected: {checkedOptions.length > 0 ? checkedOptions.join(", ") : "None"}
                    </p>
                </div>

                {/* Radio Buttons */}
                <div className="advanced-web-element shadow-host">
                    <label className="advanced-web-element-label">Radio Buttons:</label>
                    <div className="advanced-web-element-radio-group">
                        {["Option 1", "Option 2", "Option 3"].map((option) => (
                            <label key={option} className="advanced-web-element-radio-label">
                                <input
                                    type="radio"
                                    name="radioGroup"
                                    checked={selectedRadio === option}
                                    onChange={() => handleRadioChange(option)}
                                    className="advanced-web-element-radio-input"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                    <p className="advanced-web-element-output">
                        Selected: {selectedRadio || "None"}
                    </p>
                </div>

                {/* Toggle */}
                <div className="advanced-web-element shadow-host">
                    <label className="advanced-web-element-label">Enable/Disable Toggle:</label>
                    <div className="advanced-web-element-toggle-group">
                        <button
                            onClick={handleToggle}
                            className={`advanced-web-element-toggle-button ${
                                toggleStatus === "Disable" ? "disabled" : "enabled"
                            }`}
                        >
                            {toggleStatus}
                        </button>
                    </div>
                    <p className="advanced-web-element-output">
                        Current Status: {toggleStatus === "Enable" ? "Disabled" : "Enabled"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdvancedWebElementsPage;
