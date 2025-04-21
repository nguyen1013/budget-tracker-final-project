import { render, screen } from '@testing-library/react';
import SubmitButton from './SubmitButton';
import { useFormStatus } from 'react-dom';

// Mock useFormStatus from react-dom
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    useFormStatus: vi.fn(),
  };
});

describe('SubmitButton', () => {
  test('renders "Add Transaction" when not pending', () => {
    useFormStatus.mockReturnValue({ pending: false });

    render(<SubmitButton />);

    const button = screen.getByRole('button', { name: /add transaction/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Add Transaction');
    expect(button).not.toBeDisabled();
  });

  test('renders "Adding..." and disables button when pending', () => {
    useFormStatus.mockReturnValue({ pending: true });

    render(<SubmitButton />);

    const button = screen.getByRole('button', { name: /adding/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Adding...');
    expect(button).toBeDisabled();
  });
});
