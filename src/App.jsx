import { useContext, useOptimistic } from 'react';
import './budgettracker.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Header from './components/Header';
import { BudgetContext } from './context/BudgetContext';

function App() {
  const { transactions, isLoading } = useContext(BudgetContext);

  const [optimisticTransactions, setOptimisticTransactions] = useOptimistic(
    transactions,
    (prev, newItem) => [...prev, newItem]
  );

  if (isLoading) {
    return <p>Loading transactions...</p>;
  }

  return (
    <div className='container'>
      <h1>Budget Tracker</h1>
      <Header />
      <TransactionForm setOptimisticTransactions={setOptimisticTransactions} />
      <TransactionList optimisticTransactions={optimisticTransactions} />
    </div>
  );
}

export default App;
