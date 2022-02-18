import React, { useState } from "react";
import Box from "@mui/material/Box";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import "./Searchbar.css";

export default function Searchbar({ onSubmit }) {
  const [searchImages, setSearchImages] = useState("");

  const handleSearch = (event) => {
    setSearchImages(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchImages.trim() === "") {
      alert("Enter request");
      return;
    }
    onSubmit(searchImages);
    setSearchImages("");
  };

  return (
    <Box className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button
          className="SearchForm-button"
          type="submit"
          aria-label="search-button"
          onClick={handleSubmit}
        >
          <ManageSearchIcon />
        </button>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          placeholder="Search images and photos"
          value={searchImages}
          onChange={handleSearch}
        />
      </form>
    </Box>
  );
}
