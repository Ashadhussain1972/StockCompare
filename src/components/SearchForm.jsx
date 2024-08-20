import React from 'react';

function SearchForm({ query, setQuery, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-gray-800 rounded-lg shadow-md"
      style={{ width: '90%' }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter stock symbol"
        className="border border-gray-600 bg-gray-900 text-gray-100 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
