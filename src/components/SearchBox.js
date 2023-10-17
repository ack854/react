import React from "react";

const SearchBox = ({ searchHandler }) => {
  const handleSearchInputChange = (e) => {
    searchHandler(e.target.value);
  };

  return (
    <form style={{maxWidth:'100%', marginTop:'10px'}} className="search">
      <input
        onChange={handleSearchInputChange}
        type="text"
        placeholder="Search..."
      />
    </form>
  );
};

export default SearchBox;
