import React from "react";
import Search from "../Search/Search";
import "./SearchContainer.scss";

const SearchContainer = ({ results }) => {
  return (
    <div className="search-container">
      {results.map((result) => (
        <Search
          key={result._id}
          username={result.username}
          name={result.name}
          profileImg={result.profileImg}
        />
      ))}
    </div>
  );
};

export default SearchContainer;
