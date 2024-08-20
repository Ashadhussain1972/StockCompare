import React from 'react';

function Table({ data }) {
  const keys = Object.keys(data);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-gray-100 border border-gray-700">
        <thead className="bg-gray-700">
          <tr>
            {keys.map(key => (
              <th
                key={key}
                className="border-b border-gray-600 px-2  text-left text-sm font-medium"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-700">
            {keys.map(key => (
              <td
                key={key}
                className="border-b border-gray-600 px-2 py-1 text-sm"
              >
                {data[key]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
