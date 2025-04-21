import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BudgetContext } from "../context/BudgetContext";
import ChartContainer from "./ChartContainer";

// Mock PieChart, BarChart, and LineChart components
vi.mock("./charts/PieChart", () => ({
  default: () => <div>PieChart</div>,
}));
vi.mock("./charts/BarChart", () => ({
  default: () => <div>BarChart</div>,
}));
vi.mock("./charts/LineChart", () => ({
  default: () => <div>LineChart</div>,
}));

describe("ChartContainer", () => {
  const mockTransactions = [
    { id: 1, date: '2025-02-10', type: 'income', amount: 500 },
    { id: 2, date: '2025-03-15', type: 'expense', amount: 200 },
    { id: 3, date: '2025-04-10', type: 'income', amount: 700 },
  ];

  const setChartTypeMock = vi.fn();

  const renderWithContext = (transactions) =>
    render(
      <BudgetContext.Provider value={{ transactions }}>
        <ChartContainer setChartType={setChartTypeMock} />
      </BudgetContext.Provider>
    );

  test('should display "No data for charts." if there are no transactions', () => {
    renderWithContext([]);
    expect(screen.getByText("No data for charts.")).toBeInTheDocument();
  });

  test('should render PieChart when "Expenses by Category" is selected by default', () => {
    renderWithContext(mockTransactions);
    expect(screen.getByText("PieChart")).toBeInTheDocument();
  });

  test('should render BarChart when "Monthly Income vs Expense" is selected', async () => {
    renderWithContext(mockTransactions);
    const select = screen.getByLabelText(/Choose chart type:/i);
    await userEvent.selectOptions(select, "bar");
    expect(screen.getByText("BarChart")).toBeInTheDocument();
  });

  test('should render LineChart when "Savings Over Time" is selected', async () => {
    renderWithContext(mockTransactions);
    const select = screen.getByLabelText(/Choose chart type:/i);
    await userEvent.selectOptions(select, "line");
    expect(screen.getByText("LineChart")).toBeInTheDocument();
  });
});
