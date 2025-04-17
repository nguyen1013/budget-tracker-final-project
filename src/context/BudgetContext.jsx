import { createContext, useEffect, useReducer, useState } from "react";
import { getTransactionFromServer, addTransactionToServer, deleteTransactionFromServer, updateTransactionOnServer } from "../http"

export const BudgetContext = createContext(null);

const initialState = {
  transactions: [],
  saldo: 0,
  addTransaction: () => {},
  deleteTransaction: () => {},
};

function BudgetReducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    case "SET_TRANSACTIONS": // for fetching database from server and update to transactions state
      return {
        ...state,
        transactions: action.payload, // Replace transactions completely
      };
    case "UPDATE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };      
    default:
      return state;
  }
}

export default function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(BudgetReducer, initialState);
  const [isLoading, setIsLoading] = useState(true); // for initial data fetch

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const transactions = await getTransactionFromServer();
        dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  async function addTransaction(transaction) {
    try {
      const data = await addTransactionToServer(transaction);
      dispatch({ type: "ADD_TRANSACTION", payload: { ...transaction, id: data.id } });      
    } catch (error) {
      console.error("Error adding transaction:", error);
      // Revert the optimistic update
      dispatch({ type: "DELETE_TRANSACTION", payload: transaction.id });
    } 
  }

  async function deleteTransaction(transactionId) {
    try {
      await deleteTransactionFromServer(transactionId);
      dispatch({ type: "DELETE_TRANSACTION", payload: transactionId });
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  }

  async function updateTransaction(updatedTransaction) {
    try {
      await updateTransactionOnServer(updatedTransaction); // send to server
      dispatch({ type: "UPDATE_TRANSACTION", payload: updatedTransaction }); // update local state
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  }
  

  const saldo = state.transactions.reduce(
    (prev, transaction) => prev + Number(transaction.amount),
    0
  );

  return (
    <BudgetContext.Provider
      value={{
        transactions: state.transactions,
        saldo,
        addTransaction,
        deleteTransaction,
        updateTransaction, 
        isLoading,        
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}