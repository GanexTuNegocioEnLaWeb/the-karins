import React, { useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { products } from "@/consts/products";

const SearchForm = () => {
  const productsList = products.map((item) => item.name);

  const [search, setSearch] = useState("");
  // const [searchSuggestion, setSearchSuggestion] = useState([]);

  const searchSuggestion = useMemo(() => {
    const filteredSuggestions = productsList
      .filter((s) => s.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 3);
    if (
      search.length === 0 ||
      filteredSuggestions.length === 0 ||
      filteredSuggestions[0] === search
    ) {
      return [];
    }
    return filteredSuggestions;
  }, [search]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearch(suggestion);
    window.location.href = `/search/${suggestion}`;
  };

  const handleChange = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = search.trim();
    if (!value) return;
    // Redireccionar a la página de búsqueda
    window.location.href = `/search/${value}`;
  };

  return (
    <>
      <form id="form-search" className="relative" onSubmit={handleSubmit}>
        <input
          id="input-search"
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Busca tu producto"
          autoComplete="off"
          className="w-full rounded-md outline-none text-neutral-800"
        />
        <button
          className="py-2 px-4 rounded-full text-neutral-800 absolute right-0 inset-y-0 text-xl"
          type="submit"
        >
          <IoSearch />
        </button>
        {searchSuggestion.length > 0 && (
          <ul className="absolute z-20 top-12 bg-white p-2 shadow-lg rounded-md w-full space-y-1">
            {searchSuggestion.map((suggestion, index) => (
              <li key={index}>
                <button onClick={()=> handleSuggestionClick(suggestion)} className="w-full text-left text-ellipsis overflow-hidden text-nowrap hover:text-neutral-800 p-2 px-4 rounded-md hover:bg-neutral-200">
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
};

export default SearchForm;

// import { products } from "@/consts/products";
// const productsList = products.map((item) => item.name);
