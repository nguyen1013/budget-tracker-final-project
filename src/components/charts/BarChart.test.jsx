import { render, screen } from '@testing-library/react';
import { BudgetContext } from '../../context/BudgetContext';
import BarChart from './BarChart';

// Mock the Bar chart
vi.mock('react-chartjs-2', () => ({
  Bar: () => <div>Mock BarChart</div>,
}));

describe('BarChart', () => {
  const mockTransactions = [
    { id: 1, date: '2023-04-10', type: 'income', amount: 500 },
    { id: 2, date: '2023-04-15', type: 'expense', amount: 200 },
    { id: 3, date: '2023-05-10', type: 'income', amount: 700 },
    { id: 4, date: '2023-05-20', type: 'expense', amount: 300 },
    { id: 5, date: '2023-06-05', type: 'income', amount: 900 },
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

  test('processes transactions into correct monthly income and expenses', () => {
    renderWithContext(mockTransactions);

    const expectedData = {
      'Apr 2023': { income: 500, expense: 200 },
      'May 2023': { income: 700, expense: 300 },
      'Jun 2023': { income: 900, expense: 0 },
    };

    const months = Object.keys(expectedData);
    const incomeData = months.map((m) => expectedData[m].income);
    const expenseData = months.map((m) => expectedData[m].expense);

    expect(incomeData).toEqual([500, 700, 900]);
    expect(expenseData).toEqual([200, 300, 0]);
  });
});
