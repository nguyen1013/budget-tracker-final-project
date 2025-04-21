import { render, screen } from "@testing-library/react";
import { BudgetContext } from "../../context/BudgetContext";
import PieChart from "./PieChart";

// Mock the Pie chart
vi.mock("react-chartjs-2", () => ({
  Pie: () => <div>Mock PieChart</div>,
}));

describe("PieChart", () => {
  const mockTransactions = [
    { id: 1, date: '2025-02-10', type: 'income', amount: 500 },
    { id: 2, date: '2025-03-15', type: 'expense', amount: 200 },
    { id: 3, date: '2025-04-10', type: 'income', amount: 700 },
  ];
  
  const renderWithContext = (transactions) =>
    render(
      <BudgetContext.Provider value={{ transactions }}>
        <PieChart />
      </BudgetContext.Provider>
    );

  test("renders the mock PieChart component", () => {
    renderWithContext(mockTransactions);
    expect(screen.getByText("Mock PieChart")).toBeInTheDocument();
  });

});
