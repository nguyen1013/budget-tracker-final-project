import { render, screen } from "@testing-library/react";
import { BudgetContext } from "../../context/BudgetContext";
import PieChart from "./PieChart";

// Mock the Pie chart
vi.mock("react-chartjs-2", () => ({
  Pie: () => <div>Mock PieChart</div>,
}));

describe("PieChart", () => {
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
        <PieChart />
      </BudgetContext.Provider>
    );

  test("renders the mock PieChart component", () => {
    renderWithContext(mockTransactions);
    expect(screen.getByText("Mock PieChart")).toBeInTheDocument();
  });

  test("correctly processes only expense transactions by category", () => {
    renderWithContext(mockTransactions);

    const expectedCategoryTotals = {
      Food: 80,
      Rent: 800,
    };

    const categories = Object.keys(expectedCategoryTotals);
    const values = Object.values(expectedCategoryTotals);

    expect(categories).toEqual(["Food", "Rent"]);
    expect(values).toEqual([80, 800]);
  });
});
