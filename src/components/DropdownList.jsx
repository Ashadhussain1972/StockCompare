import React from 'react';

function DropdownList({ data, selectedKey, onSelectionChange }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-3 text-gray-200">Select a Key</h2>
      <select
        onChange={onSelectionChange}
        value={selectedKey}
        className="bg-gray-700 border border-gray-600 text-gray-200 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      >
        <option value="" className="bg-gray-800">Select a key</option>
        {Object.keys(data[0] || {}).map(key => (
          <option key={key} value={key} className="bg-gray-800">{key}</option>
        ))}
      </select>
    </div>
  );
}

export default DropdownList;
