import { render, screen } from '@testing-library/react';
import { BudgetContext } from '../context/BudgetContext';
import Header from './Header';

describe('Header Component', () => {
  test('renders the header correctly', () => {
    const mockContextValue = { saldo: 0 }; 
  
    render(
      <BudgetContext.Provider value={mockContextValue}>
        <Header />
      </BudgetContext.Provider>
    )
  
    // Assert that the header is rendered correctly
    const headerElement = screen.getByText(/Balance/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the balance correctly', () => {
    const mockBalance = 500; 
    const mockContextValue = { saldo: mockBalance };
  
    render(
      <BudgetContext.Provider value={mockContextValue}>
        <Header />
      </BudgetContext.Provider>
    )
  
    // Assert that the balance is displayed correctly
    const balanceElement = screen.getByText(`${mockBalance}€`);
    expect(balanceElement).toBeInTheDocument();
  });

})


