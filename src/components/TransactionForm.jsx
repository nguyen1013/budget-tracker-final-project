import { useContext, useState, useActionState } from "react";
import { BudgetContext } from "../context/BudgetContext";
import Modal from "./Modal";
import Error from "./Error";
import SubmitButton from "./SubmitButton";

export default function TransactionForm({ setOptimisticTransactions }) {
  const { addTransaction } = useContext(BudgetContext);
  const [invalidInput, setInvalidInput] = useState(false);

  async function handleCreateTransaction(prevFormState, formData) {
    const amount = formData.get("amount");
    const category = formData.get("category");
    const description = formData.get("description");
    const newDate = new Date().toISOString().slice(0, 10);

    let errors = [];

    if (isNaN(amount) || amount <= 0) {
      errors.push("Please input a valid positive value.");
    }

    if (!description) {
      errors.push("Please input valid description.");
    }

    if (errors.length) {
      setInvalidInput(true);
      return {
        errors,
        enterValues: {
          amount,
          description,
          category,
          newDate,
        },
      };
    }

    setInvalidInput(false);

    const tempId = Date.now();
    const transaction = {
      id: tempId, 
      type: category === "salary" ? "income" : "expense",
      amount: category === "salary" ? amount : -amount,
      description,
      date: newDate,
      category,
    };
    
    setOptimisticTransactions(transaction);
    await addTransaction(transaction);

    return { errors: null };
  }

  const [formState, formAction, pending] = useActionState(
    handleCreateTransaction,
    {
      errors: null,
    }
  );

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

      <form action={formAction}>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          defaultValue={formState.enterValues?.description}
        />

        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          defaultValue={formState.enterValues?.amount}
        />

        <label htmlFor="category">Category</label>
        <select id="category" name="category">
          <option value="salary">Salary</option>
          <option value="transportation">Transportation</option>
          <option value="food">Food</option>
          <option value="subscription">Subscription</option>
          <option value="clothing">Clothing</option>
          <option value="groceries">Groceries</option>
          <option value="entertainment">Entertainment</option>
          <option value="other">Other</option>
        </select>

        <SubmitButton />
      </form>
    </>
  );
}
