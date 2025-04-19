import { useContext, useOptimistic, useState } from "react";
import "./budgettracker.css";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Header from "./components/Header";
import ChartContainer from "./components/ChartContainer";
import { BudgetContext } from "./context/BudgetContext";

function App() {
  const { transactions, isLoading } = useContext(BudgetContext);
  const [chartType, setChartType] = useState("pie");

  const [optimisticTransactions, setOptimisticTransactions] = useOptimistic(
    transactions,
    (prev, newItem) => [...prev, newItem]
  );

  if (isLoading) {
    return <p className="loading">Loading transactions...</p>;
  }

  return (
    <div className="body-container">
      <header>
        <h1>Online Environment Tools - Final Project</h1>
      </header>
      <div className="main">
        <div className="container">
          <h1>Budget Tracker</h1>
          <Header />
          <TransactionForm
            setOptimisticTransactions={setOptimisticTransactions}
          />
        </div>
        <div className="chart">
          {/* Chart Type Selector */}
          <div className="chart-selector">
            <label htmlFor="chartType">Choose chart type: </label>
            <select
              id="chartType"
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value="pie">Expenses by Category (Pie)</option>
              <option value="bar">Monthly Income vs Expense (Bar)</option>
              <option value="line">Savings Over Time (Line)</option>
            </select>
          </div>

          {/* Chart Display */}
          <ChartContainer chartType={chartType} transactions={transactions} />
        </div>
      </div>
      <TransactionList optimisticTransactions={optimisticTransactions} />
      <footer>Vaasa University of Applied Sciences - IT2023B<br></br>Made by Nguyen Nguyen</footer>  
    </div>
  );
}

export default App;
