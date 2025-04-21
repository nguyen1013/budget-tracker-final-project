// Confirm.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Confirm from './Confirm';

// Mock the functions 
const mockOnConfirm = vi.fn();
const mockOnCancel = vi.fn();

describe('Confirm Component', () => {
  beforeEach(() => {
    const confirmRoot = document.getElementById('confirm');
    if (!confirmRoot) {
      const newConfirmRoot = document.createElement('div');
      newConfirmRoot.setAttribute('id', 'confirm');
      document.body.appendChild(newConfirmRoot);
    }
  });

  afterEach(() => {
    const confirmRoot = document.getElementById('confirm');
    if (confirmRoot) confirmRoot.remove();
  });

  test('should render the confirm dialog with message', () => {
    render(<Confirm message="Are you sure?" onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
    
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  test('should call onConfirm when Yes button is clicked', async () => {
    render(<Confirm message="Are you sure?" onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
    
    await userEvent.click(screen.getByText('Yes'));

    expect(mockOnConfirm).toHaveBeenCalled();
  });

  test('should call onCancel when No button is clicked', async () => {
    render(<Confirm message="Are you sure?" onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
    
    await userEvent.click(screen.getByText('No'));

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
