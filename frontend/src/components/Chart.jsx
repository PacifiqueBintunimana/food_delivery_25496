// /* eslint-disable no-unused-vars */
// import React, { useEffect, useRef } from 'react';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// } from 'chart.js';
// import { Line, Pie } from 'react-chartjs-2';

// // Register ChartJS components
// ChartJS.register(
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// export const LineChart = ({ data }) => {
//   const chartRef = useRef(null);

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Monthly Statistics'
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   };

//   useEffect(() => {
//     const chart = chartRef.current;
    
//     return () => {
//       if (chart) {
//         chart.destroy();
//       }
//     };
//   }, []);

//   return <Line ref={chartRef} options={options} data={data} />;
// };

// export const PieChart = ({ data }) => {
//   const chartRef = useRef(null);

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Distribution'
//       }
//     }
//   };

//   useEffect(() => {
//     const chart = chartRef.current;
    
//     return () => {
//       if (chart) {
//         chart.destroy();
//       }
//     };
//   }, []);

//   return <Pie ref={chartRef} options={options} data={data} />;
// };
