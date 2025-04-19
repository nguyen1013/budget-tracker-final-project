import { useContext } from "react";
import { BudgetContext } from "../../context/BudgetContext";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const categoryColors = {
  salary: "#4CAF50",
  transportation: "#FF676A",
  food: "#4caf50",
  subscription: "#F5E91F",
  clothing: "#1A5AC0",
  groceries: "#FF8066",
  entertainment: "#D93BAF",
  other: "#8AD2F5"
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
