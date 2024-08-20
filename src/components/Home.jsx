import React from 'react';
import { Link } from 'react-router-dom';
import stockImage from './img/posterImage.jpg'; 

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex flex-col items-center">
      <header className="relative w-full max-w-full mb-12">
     
        <img
          src={stockImage}
          alt="Stock Market"
          className="w-full h-[80vh] object-cover rounded-lg"
        />

       
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg">
          <h1 className="text-6xl font-extrabold mb-6 text-white">Welcome to StockCompare</h1>
          <p className="text-2xl mb-8 text-white">Your go-to platform for analyzing and comparing stock performance.</p>
          <Link
            to="/compare"
            className="inline-block bg-blue-700 text-white px-8 py-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Start Comparing Stocks
          </Link>
        </div>
      </header>
      
      <section className="w-full max-w-6xl bg-gray-800 shadow-xl rounded-lg p-8 mb-12">
        <h2 className="text-4xl font-bold mb-6">Latest Stock Trends</h2>
        <p className="text-xl leading-relaxed">
          Stay updated with the latest trends and insights on stock performance. Our platform provides real-time data and analysis to help you make informed decisions.
        </p>
      </section>

      <section className="w-full max-w-6xl bg-gray-800 shadow-xl rounded-lg p-8">
        <h2 className="text-4xl font-bold mb-6">Upcoming Features</h2>
        <ul className="list-disc pl-6 space-y-4">
          <li className="text-xl">Enhanced comparison tools for multi-stock analysis</li>
          <li className="text-xl">Detailed financial reports and historical data</li>
          <li className="text-xl">Personalized stock alerts and notifications</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
