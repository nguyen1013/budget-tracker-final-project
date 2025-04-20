import { render, screen } from '@testing-library/react';
import { BudgetContext } from '../context/BudgetContext';
import Header from './Header';


test('renders the balance correctly', () => {
  const mockSaldo = 500; // Mocked balance value
  const mockContextValue = { saldo: mockSaldo };

  render(
    <BudgetContext.Provider value={mockContextValue}>
      <Header />
    </BudgetContext.Provider>
  )

  // Assert that the balance is displayed correctly
  const balanceElement = screen.getByText(`${mockSaldo}€`);
  expect(balanceElement).toBeInTheDocument();
});
