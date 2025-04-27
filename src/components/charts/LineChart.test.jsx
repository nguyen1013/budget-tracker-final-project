import { render, screen } from '@testing-library/react';
import { BudgetContext } from '../../context/BudgetContext';
import LineChart from './LineChart';
import { vi, test, describe, expect } from 'vitest';

// Mock the Line chart 
vi.mock('Mock LineChart', () => ({
  Line: () => <div>Mock LineChart</div>,
}));

describe('LineChart', () => {
  const mockTransactions = [
    { id: 1, date: '2025-02-10', type: 'income', amount: 500 },
    { id: 2, date: '2025-03-15', type: 'expense', amount: 200 },
    { id: 3, date: '2025-04-10', type: 'income', amount: 700 },
  ];

  const renderWithContext = (transactions) =>
    render(
      <BudgetContext.Provider value={{ transactions }}>
        <LineChart />
      </BudgetContext.Provider>
    );

  test('renders mock LineChart component', () => {
    renderWithContext(mockTransactions);
    expect(screen.getByText('Mock LineChart')).toBeInTheDocument();
  });
  
});
