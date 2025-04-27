import { render, screen } from '@testing-library/react';
import { BudgetContext } from '../../context/BudgetContext';
import BarChart from './BarChart';

// Mock the Bar chart
vi.mock('Mock BarChart', () => ({
  Bar: () => <div>Mock BarChart</div>,
}));

describe('BarChart', () => {
  const mockTransactions = [
    { id: 1, date: '2025-02-10', type: 'income', amount: 500 },
    { id: 2, date: '2025-03-15', type: 'expense', amount: 200 },
    { id: 3, date: '2025-04-10', type: 'income', amount: 700 },
  ];

  const renderWithContext = (transactions) =>
    render(
      <BudgetContext.Provider value={{ transactions }}>
        <BarChart />
      </BudgetContext.Provider>
    );

  test('renders mock BarChart component', () => {
    renderWithContext(mockTransactions);
    expect(screen.getByText('Mock BarChart')).toBeInTheDocument();
  });
  
});
