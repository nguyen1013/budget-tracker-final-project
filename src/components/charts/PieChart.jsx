import { useContext } from "react";
import { BudgetContext } from "../../context/BudgetContext";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const { transactions } = useContext(BudgetContext);

  const expenseData = transactions.filter(t => t.type === 'expense');

  const categorySums = expenseData.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categorySums),
    datasets: [{
      label: 'Expenses by Category',
      data: Object.values(categorySums),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#6A5ACD'],
    }],
  };

  return <Pie data={data} />;
}
