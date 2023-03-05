import { useState } from "react";
import useChatContext from "../hooks/useChatContext";

export default function Search() {
  const [query, setQuery] = useState("");
  const { searchUser, searchResults, setSearchResults, createChat } =
    useChatContext();

  async function handleSearch() {
    await searchUser(query);
  }

  async function handleResultClick(userId) {
    await createChat(userId);
    setQuery("");
    setSearchResults();
  }

  function handleClear(){
    setQuery("");
    setSearchResults();
  }

  return (
    <div className="search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>search</button>
      <button onClick={handleClear}>clear</button>
      <div className={`${searchResults && "results"}`}>
        {searchResults &&
          searchResults.map((x) => (
            <div key={x._id}>
              <button onClick={() => handleResultClick(x._id)}>{x.name}</button>
            </div>
          ))}
      </div>
    </div>
  );
}
