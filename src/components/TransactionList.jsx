import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";
import Transaction from "./Transaction";

export default function TransactionList({ optimisticTransactions }) {
  const { transactions } = useContext(BudgetContext);

  return (
    <div>
      <h3>Transactions</h3>
      {optimisticTransactions && (
        <ul className="transaction-list">
          {optimisticTransactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      )}
    </div>
  );
}
