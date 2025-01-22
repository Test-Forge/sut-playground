import React from "react";
import "../styles/Filters.css";

const Filters = ({ filters, setFilters }) => {
    return (
        <div className="filters">
            <select
                name="category"
                value={filters.category}
                onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
                className="filter-select"
            >
                <option value="">All Categories</option>
                <option value="Laptops">Laptops</option>
                <option value="Smartphones">Smartphones</option>
                <option value="Accessories">Accessories</option>
            </select>
            <input
                type="text"
                name="name"
                placeholder="Search by name"
                value={filters.name}
                onChange={(e) => setFilters((prev) => ({ ...prev, name: e.target.value }))}
                className="filter-input"
            />
            <select
                name="sort"
                value={filters.sort}
                onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
                className="filter-select"
            >
                <option value="nameAsc">Sort by Name: A to Z</option>
                <option value="nameDesc">Sort by Name: Z to A</option>
                <option value="priceAsc">Sort by Price: Low to High</option>
                <option value="priceDesc">Sort by Price: High to Low</option>
            </select>
        </div>
    );
};

export default Filters;
