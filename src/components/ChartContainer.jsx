import PieChart from './charts/PieChart';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';

export default function ChartContainer({ chartType, transactions }) {
  if (!transactions || transactions.length === 0) return <p>No data for charts.</p>;

  switch (chartType) {
    case 'pie':
      return <PieChart transactions={transactions} />;
    case 'bar':
      return <BarChart transactions={transactions} />;
    case 'line':
      return <LineChart transactions={transactions} />;
    default:
      return null;
  }
}