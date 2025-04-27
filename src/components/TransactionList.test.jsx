import { render, screen } from "@testing-library/react";
import TransactionList from "./TransactionList"; 
import { describe } from "vitest";

describe("TransactionList", () => { 
  test("renders filters", () => {
    render(<TransactionList />);

    expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/min amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/max amount/i)).toBeInTheDocument();
  });
});

