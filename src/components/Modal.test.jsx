import { render, screen } from "@testing-library/react";  
import { createPortal } from "react-dom";
import Modal from "./Modal";

describe("Modal Component", () => {
  test("renders the modal when open is true", () => {
    const mockOnClose = jest.fn();
    render(<Modal open={true} onClose={mockOnClose}>Test Modal</Modal>);
    
    const modalElement = screen.getByRole("dialog");
    expect(modalElement).toBeInTheDocument();
    expect(modalElement).toHaveTextContent("Test Modal");
  });


})