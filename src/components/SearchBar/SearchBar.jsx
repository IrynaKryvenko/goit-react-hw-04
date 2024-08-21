import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiSearch } from "react-icons/fi";

import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return toast.success("Please enter what you want to find");
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <div className={css.search}>
      <Toaster position="top-center" reverseOrder={false} />
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={query}
          className={css.input}
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
        />
        <button className={css.btn} type="submit">
          <FiSearch size="16px" />
        </button>
      </form>
    </div>
  );
};
export default SearchBar;