import { render, screen, waitFor } from '@testing-library/react';
import TransactionForm from './TransactionForm';
import { BudgetContext } from '../context/BudgetContext';
import userEvent from '@testing-library/user-event';

// Mocks
const mockAddTransaction = vi.fn();
const mockSetOptimisticTransactions = vi.fn();

function renderWithContext(ui) {
  return render(
    <BudgetContext.Provider value={{ addTransaction: mockAddTransaction }}>
      {ui}
    </BudgetContext.Provider>
  );
}

beforeEach(() => {
  // Reset mock functions before each test
  mockAddTransaction.mockReset();
  mockSetOptimisticTransactions.mockReset();
});

describe('TransactionForm', () => {
  test('renders form fields', () => {
    renderWithContext(
      <TransactionForm setOptimisticTransactions={mockSetOptimisticTransactions} />
    );

    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('shows error modal when submitting invalid data', async () => {
    renderWithContext(
      <TransactionForm setOptimisticTransactions={mockSetOptimisticTransactions} />
    );

    const submitButton = screen.getByRole('button');

    await userEvent.click(submitButton); 

    await waitFor(() => {
      expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
    });
  });

  test('calls addTransaction on valid submission', async () => {
    mockAddTransaction.mockResolvedValueOnce(undefined); 

    renderWithContext(
      <TransactionForm setOptimisticTransactions={mockSetOptimisticTransactions} />
    );

    await userEvent.type(screen.getByLabelText(/description/i), 'Salary');
    await userEvent.type(screen.getByLabelText(/amount/i), '1000');
    await userEvent.selectOptions(screen.getByLabelText(/category/i), 'salary');

    const submitButton = screen.getByRole('button');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetOptimisticTransactions).toHaveBeenCalled();
      expect(mockAddTransaction).toHaveBeenCalled();
    });
  });
});
