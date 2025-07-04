import React from 'react';
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8B0A1A', '#78edee'];

export default function ExpenseCharts({ expenses }) {
    // Transform data for charts
    const monthlyExpenses = expenses.reduce((acc, expense) => {
        const month = expense.date.slice(0, 7); // "YYYY-MM"
        acc[month] = (acc[month] || 0) + expense.amount;
        return acc;
    }, {});

    const categoryExpenses = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    // Format for Recharts
    const monthlyData = Object.entries(monthlyExpenses).map(([month, total]) => ({
        month,
        total
    }));

    const categoryData = Object.entries(categoryExpenses).map(([name, value]) => ({
        name,
        value
    }));

    return (
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '100px' }}>
            {/* Monthly Expenses Bar Chart */}
            <div style={{ flex: 1, minWidth: '400px' }}>
                <h4>Monthly Expenses</h4>
                <BarChart width={400} height={450} data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
            </div>

            {/* Category Pie Chart */}
            <div style={{ flex: 1, minWidth: '400px' }}>
                <h4>Expense by Category</h4>
                <PieChart width={650} height={450}>
                    <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={115}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                        {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
}




//chart.js
// import React, { useRef, useEffect } from 'react';
// import { Chart, BarController, CategoryScale, LinearScale, BarElement, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

// // Register Chart.js components
// Chart.register(BarController, CategoryScale, LinearScale, BarElement, PieController, ArcElement, Tooltip, Legend);

// const ExpenseCharts = ({ expenses }) => {
//     const monthlyChartRef = useRef(null);
//     const categoryChartRef = useRef(null);

//     useEffect(() => {
//         if (!expenses.length) return;

//         // Process data for monthly chart
//         const monthlyData = expenses.reduce((acc, expense) => {
//             const month = expense.date.substring(0, 7); // YYYY-MM
//             acc[month] = (acc[month] || 0) + expense.amount;
//             return acc;
//         }, {});

//         // Process data for category chart
//         const categoryData = expenses.reduce((acc, expense) => {
//             acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
//             return acc;
//         }, {});

//         // Destroy previous charts if they exist
//         if (monthlyChartRef.current?.chart) {
//             monthlyChartRef.current.chart.destroy();
//         }
//         if (categoryChartRef.current?.chart) {
//             categoryChartRef.current.chart.destroy();
//         }

//         // Monthly expenses bar chart
//         monthlyChartRef.current.chart = new Chart(monthlyChartRef.current, {
//             type: 'bar',
//             data: {
//                 labels: Object.keys(monthlyData),
//                 datasets: [{
//                     label: 'Monthly Expenses',
//                     data: Object.values(monthlyData),
//                     backgroundColor: 'rgba(54, 162, 235, 0.6)',
//                     borderColor: 'rgba(54, 162, 235, 1)',
//                     borderWidth: 1
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 scales: {
//                     y: {
//                         beginAtZero: true,
//                         title: {
//                             display: true,
//                             text: 'Amount ($)'
//                         }
//                     },
//                     x: {
//                         title: {
//                             display: true,
//                             text: 'Month'
//                         }
//                     }
//                 }
//             }
//         });

//         // Category pie chart
//         categoryChartRef.current.chart = new Chart(categoryChartRef.current, {
//             type: 'pie',
//             data: {
//                 labels: Object.keys(categoryData),
//                 datasets: [{
//                     data: Object.values(categoryData),
//                     backgroundColor: [
//                         'rgba(255, 99, 132, 0.6)',
//                         'rgba(75, 192, 192, 0.6)',
//                         'rgba(255, 206, 86, 0.6)',
//                         'rgba(153, 102, 255, 0.6)',
//                         'rgba(54, 162, 235, 0.6)'
//                     ],
//                     borderWidth: 1
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 plugins: {
//                     legend: {
//                         position: 'right'
//                     },
//                     tooltip: {
//                         callbacks: {
//                             label: (context) => {
//                                 const label = context.label || '';
//                                 const value = context.raw || 0;
//                                 const total = context.dataset.data.reduce((a, b) => a + b, 0);
//                                 const percentage = Math.round((value / total) * 100);
//                                 return `${label}: $${value} (${percentage}%)`;
//                             }
//                         }
//                     }
//                 }
//             }
//         });

//         // Cleanup function
//         return () => {
//             if (monthlyChartRef.current?.chart) {
//                 monthlyChartRef.current.chart.destroy();
//             }
//             if (categoryChartRef.current?.chart) {
//                 categoryChartRef.current.chart.destroy();
//             }
//         };
//     }, [expenses]);

//     return (
//         <div style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: '20px',
//             marginTop: '30px'
//         }}>
//             <div style={{ flex: '1 1 200px 200px' }}>
//                 <h4>Monthly Expenses</h4>
//                 <canvas ref={monthlyChartRef} />
//             </div>
//             <div style={{ flex: '1 1 200px 200px' }}>
//                 <h4>Expense by Category</h4>
//                 <canvas ref={categoryChartRef} />
//             </div>
//         </div>
//     );
// };

// export default ExpenseCharts;