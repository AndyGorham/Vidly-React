import React from "react";

const Search = ({ value, onSearch }) => {
  return (
    <div className="md-form mt-0">
      <input
        className="form-control my-3"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => onSearch(e.currentTarget.value)}
        value={value}
      />
    </div>
  );
};

export default Search;
