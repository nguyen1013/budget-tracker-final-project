import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function LineChart({ transactions }) {
  const monthlySavings = {};

  transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!monthlySavings[month]) monthlySavings[month] = 0;
    monthlySavings[month] += Number(t.amount);
  });

  const labels = Object.keys(monthlySavings);
  const savingsData = labels.map(month => monthlySavings[month]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Net Savings',
        data: savingsData,
        fill: false,
        borderColor: '#2196f3',
        tension: 0.3,
      },
    ],
  };

  return <Line data={data} />;
}
