import { useContext } from "react";
import { BudgetContext } from "../../context/BudgetContext";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const categoryColors = {
  salary: "#4CAF50",
  transportation: "#FF6384",
  food: "#36A2EB",
  subscription: "#FFCE56",
  clothing: "#1A5AC0",
  groceries: "#FFA07A",
  entertainment: "#8A2BE2",
  other: "#D3D3D3"
};

export default function PieChart() {
  const { transactions } = useContext(BudgetContext);

  const expenseData = transactions.filter(t => t.type === "expense");

  const categorySums = expenseData.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
    return acc;
  }, {});

  const labels = Object.keys(categorySums);
  const dataValues = Object.values(categorySums);
  const backgroundColors = labels.map(label => categoryColors[label] || "#999");

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses by Category",
        data: dataValues,
        backgroundColor: backgroundColors,
      },
    ],
  };

  return <Pie data={data} />;
}
