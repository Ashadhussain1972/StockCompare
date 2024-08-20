import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">About StockCompare</h1>
        <p className="text-lg mb-8">
          Learn more about StockCompare, your ultimate platform for analyzing and comparing stock performance. We provide up-to-date data and powerful tools to help you make informed investment decisions.
        </p>
      </header>

      <section className="w-full max-w-4xl bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg">
          Our mission is to empower investors with the best tools and insights to analyze stocks effectively. We strive to provide accurate, real-time data and comprehensive analysis to help you stay ahead in the stock market.
        </p>
      </section>

     
    </div>
  );
}

export default About;
