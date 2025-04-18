import { useState } from "react";
import Transaction from "./Transaction";

export default function TransactionList({ optimisticTransactions }) {
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const filteredTransactions = optimisticTransactions?.filter((t) => {
    // Filter by type
    if (typeFilter !== "all" && t.type !== typeFilter) return false;

    // Filter by category
    if (categoryFilter !== "all" && t.category !== categoryFilter) return false;

    // Filter by date range
    if (startDate && new Date(t.date) < new Date(startDate)) return false;
    if (endDate && new Date(t.date) > new Date(endDate)) return false;

    // Filter by amount
    const absAmount = Math.abs(Number(t.amount));
    if (minAmount && absAmount < Number(minAmount)) return false;
    if (maxAmount && absAmount > Number(maxAmount)) return false;

    return true;
  });

  return (
    <div>
      <h3>Transactions</h3>

      <div className="filters">
        <label>
          Type:
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label>
          Category:
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="salary">Salary</option>
            <option value="gasoline">Gasoline</option>
            <option value="food">Food</option>
            <option value="magazines">Magazines</option>
          </select>
        </label>

        <label>
          From:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>

        <label>
          To:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>

        <label>
          Min Amount:
          <input type="number" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} />
        </label>

        <label>
          Max Amount:
          <input type="number" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} />
        </label>
      </div>

      {filteredTransactions && filteredTransactions.length > 0 ? (
        <ul className="transaction-list">
          {filteredTransactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      ) : (
        <p>No transactions match the selected filters.</p>
      )}
    </div>
  );
}
