import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

export default function BarChart({ transactions }) {
  const monthlyData = {};

  transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!monthlyData[month]) monthlyData[month] = { income: 0, expense: 0 };

    if (t.type === 'income') {
      monthlyData[month].income += Number(t.amount);
    } else {
      monthlyData[month].expense += Math.abs(Number(t.amount));
    }
  });

  const labels = Object.keys(monthlyData);
  const incomeData = labels.map(month => monthlyData[month].income);
  const expenseData = labels.map(month => monthlyData[month].expense);

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: '#4caf50',
      },
      {
        label: 'Expense',
        data: expenseData,
        backgroundColor: '#f44336',
      },
    ],
  };

  return <Bar data={data} />;
}
