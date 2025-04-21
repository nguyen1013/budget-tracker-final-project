import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Transaction from "./Transaction";
import { BudgetContext } from "../context/BudgetContext";
import { expect } from "vitest";

// Mocks
const mockDeleteTransaction = vi.fn();
const mockUpdateTransaction = vi.fn();

const transaction = {
  id: 1,
  amount: 20,
  description: "Coffee",
  date: new Date("2025-04-20").toISOString(),
  type: "expense",
  category: "food",
};

function renderWithContext(ui) {
  return render(
    <BudgetContext.Provider
      value={{
        deleteTransaction: mockDeleteTransaction,
        updateTransaction: mockUpdateTransaction,
      }}
    >
      {ui}
    </BudgetContext.Provider>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Transaction", () => {
  test("renders transaction details", () => {
    renderWithContext(<Transaction transaction={transaction} />);

    expect(screen.getByText(/Coffee/i)).toBeInTheDocument();
    expect(screen.getByText(/20€/i)).toBeInTheDocument();
    expect(screen.getByText("20-04-2025")).toBeInTheDocument();
    expect(screen.getByText(/x/i)).toBeInTheDocument();
  });

  test('opens confirm dialog when delete button is clicked', async () => {
    renderWithContext(<Transaction transaction={transaction} />);
    
    const deleteButton = screen.getByText(/x/i);
    await userEvent.click(deleteButton);
  
    expect(await screen.findByText(/are you sure\?/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /yes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /no/i })).toBeInTheDocument();
  });

  test('confirms deletion when "Yes" is clicked', async () => {
    renderWithContext(<Transaction transaction={transaction} />);
    
    const deleteButton = screen.getByText(/x/i);
    await userEvent.click(deleteButton);
  
    const confirmButton = await screen.findByRole("button", { name: /yes/i });
    await userEvent.click(confirmButton);
  
    expect(mockDeleteTransaction).toHaveBeenCalledWith(transaction.id);
  });
  
  test('removes confirm dialog when "No" is clicked', async () => {
    renderWithContext(<Transaction transaction={transaction} />);
    
    // Trigger the confirm modal
    const deleteButton = screen.getByText(/x/i);
    await userEvent.click(deleteButton);
  
    // "No" button should be visible
    const cancelButton = await screen.findByRole("button", { name: /no/i });
    await userEvent.click(cancelButton);
  
    await waitFor(() => {
      expect(screen.queryByText(/are you sure\?/i)).not.toBeInTheDocument();
    });
  
    expect(mockDeleteTransaction).not.toHaveBeenCalled();
  });     
});
