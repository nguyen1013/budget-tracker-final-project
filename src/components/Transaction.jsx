import { useContext, useState, useActionState } from "react";
import { BudgetContext } from "../context/BudgetContext";
import Confirm from "./Confirm";
import Modal from "./Modal";
import Error from "./Error";
import { convertDateFormat } from "../utilities/helper"

export default function Transaction({ transaction }) {
  const { deleteTransaction, updateTransaction } = useContext(BudgetContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);

  const transactionDate = transaction.date.slice(0, 10)
  const formattedDate = convertDateFormat(transactionDate);

  let currentAmount =
    Number(transaction.amount) > 0
      ? Number(transaction.amount)
      : -Number(transaction.amount);
  currentAmount = currentAmount.toFixed(0);  

  async function updateTransactionAction(prevFormState, formData) {
    let newAmount = formData.get("amount");    
    const type = transaction.type;

    let errors = [];

    if (isNaN(newAmount) || newAmount <= 0) {
      errors.push("Please input a valid positive value.");
    }

    if (errors.length) {
      setInvalidInput(true);
      return {
        errors,
      };
    }

    if (type === "expense") newAmount = -newAmount;

    setInvalidInput(false);
    const newTransaction = { ...transaction, amount: newAmount };
    await updateTransaction(newTransaction);
    setIsEditing(false);
  }

  const [formState, formAction] = useActionState(updateTransactionAction, {
    errors: null,
  });

  function handleClick() {
    setIsEditing(false);
  }

  function handleError() {
    setInvalidInput(false);
  }

  return (
    <>
      <Modal open={invalidInput} onClose={handleError}>
        {invalidInput && (
          <Error
            title="An error occurred"
            errors={formState.errors}
            onConfirm={handleError}
          />
        )}
      </Modal>
      <li className={transaction.amount > 0 ? "income" : "expense"}>
        {isEditing ? (
          <form action={formAction} className="transaction-edit" >
            <label htmlFor="amount">{transaction.description} </label>
            <input type="number" name="amount" defaultValue={currentAmount} />
            <button type="submit">Save</button>
            <button type="button" onClick={handleClick}>
              Cancel
            </button>
          </form>
        ) : (
          <>
            <div className="transaction-item"
              onClick={() => setIsEditing(true)}
              style={{ cursor: "pointer" }}
            >
              <p className="transaction-description">{transaction.description}{" "}</p>
              <p className="transaction-amount">{currentAmount}€</p>
              <p className="transaction-date">{formattedDate} </p>
            </div>                   
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
