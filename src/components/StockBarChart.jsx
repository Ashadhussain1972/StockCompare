import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

function StockBarChart({ stocks, selectedKey }) {
  if (!stocks || stocks.length === 0 || !selectedKey) return null;

  
  const labels = stocks.map(stock => stock.stock);
  const dataValues = stocks.map(stock => {
    const value = Number(stock[selectedKey].replace(/,/g, '')); 
    return isNaN(value) ? 0 : value;
  });

  
  console.log("Data Values: ", dataValues);

  
  const maxValue = Math.max(...dataValues);
  const suggestedMax = Math.ceil(maxValue * 1.1); 

  const data = {
    labels: labels,
    datasets: [{
      label: selectedKey,
      data: dataValues,
      backgroundColor: dataValues.map(() => 
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`
      ),
      borderColor: 'rgba(0, 0, 0, 0.2)',
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      datalabels: {
        display: true,
        color: 'white', 
        anchor: 'end',
        align: 'end',
        formatter: (value) => value.toLocaleString(), 
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Stocks',
        },
      },
      y: {
        title: {
          display: true,
          text: selectedKey,
        },
        min: 0, 
        max: suggestedMax,
        beginAtZero: true, 
        ticks: {
          callback: function (value) {
            return value.toLocaleString(); // Format y-axis labels with commas
          },
        },
      },
    },
  };

  return (
    <div className="mb-6">
      <Bar data={data} options={options} />
    </div>
  );
}

export default StockBarChart;
