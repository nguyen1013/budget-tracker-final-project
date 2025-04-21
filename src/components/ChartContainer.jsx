import { useState, useContext } from "react";
import PieChart from "./charts/PieChart";
import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
import { BudgetContext } from "../context/BudgetContext";

export default function ChartContainer() {
  const [chartType, setChartType] = useState("pie");
  const { transactions } = useContext(BudgetContext);

  if (!transactions || transactions.length === 0) return <p>No data for charts.</p>;

  return (
    <div className="chart">
      <div className="chart-selector">
        <label htmlFor="chartType">Choose chart type: </label>
        <select
          id="chartType"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="pie">Expenses by Category</option>
          <option value="bar">Monthly Income vs Expense</option>
          <option value="line">Savings Over Time</option>
        </select>
      </div>

      {chartType === "pie" && <PieChart />}
      {chartType === "bar" && <BarChart />}
      {chartType === "line" && <LineChart />}
    </div>
  );
}
