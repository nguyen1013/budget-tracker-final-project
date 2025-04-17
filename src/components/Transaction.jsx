import { useContext, useState } from "react";
import { BudgetContext } from "../context/BudgetContext";
import Confirm from "./Confirm";

export default function Transaction({ transaction }) {
  const { deleteTransaction, updateTransaction } = useContext(BudgetContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newDesc, setNewDesc] = useState(transaction.description);
  const [newAmount, setNewAmount] = useState(transaction.amount);

  const handleSave = (e) => {
    e.preventDefault();
    updateTransaction({
      ...transaction,
      description: newDesc,
      amount: Number(newAmount),
    });
    setIsEditing(false);
  };

  return (
    <>
      <li className={transaction.amount > 0 ? "income" : "expense"}>
        {isEditing ? (
          <form onSubmit={handleSave} style={{ display: "inline" }}>
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />
            <input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <>
            <span onClick={() => setIsEditing(true)} style={{ cursor: "pointer" }}>
              {transaction.description} {transaction.amount > 0 ? transaction.amount : -transaction.amount}
            </span>
            <button onClick={() => setShowConfirm(true)}>X</button>
          </>
        )}
      </li>

      {showConfirm && (
        <Confirm
          message="Are you sure?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            deleteTransaction(transaction.id);
            setShowConfirm(false);
          }}
        />
      )}
    </>
  );
}
