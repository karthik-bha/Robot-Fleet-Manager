import React from "react";

const Filter = ({ filterValue, setFilterValue }) => {
    return (
        <div className="gap-4 flex">
            <label>
                Filter by Status: 
                </label>
                <select
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="low_battery">Low Battery</option>
                </select>
           
        </div>
    );
};

export default Filter;
