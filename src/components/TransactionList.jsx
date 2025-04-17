import Transaction from "./Transaction";

export default function TransactionList({ optimisticTransactions }) {

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
