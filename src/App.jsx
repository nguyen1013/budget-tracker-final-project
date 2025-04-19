import { useContext, useOptimistic } from "react";
import "./budgettracker.css";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Header from "./components/Header";
import ChartContainer from "./components/ChartContainer";
import { BudgetContext } from "./context/BudgetContext";

function App() {
  const { transactions, isLoading } = useContext(BudgetContext);

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

        <ChartContainer />

      </div>

      <hr></hr>

      <TransactionList optimisticTransactions={optimisticTransactions} />

      <footer>Vaasa University of Applied Sciences - IT2023B<br></br>Made by Nguyen Nguyen</footer>
    </div>
  );
}

export default App;
