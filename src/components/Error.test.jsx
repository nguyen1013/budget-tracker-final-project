import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Error from './Error';

describe('Modal dialog render', () => {
  test('renders the title correctly', () => {
    render(<Error title="An error occurred" errors={[]} />);
    const titleElement = screen.getByText('An error occurred');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders a list of error messages', async () => {
    const errors = ['Please input a valid positive value.', 'Please input valid description.'];
    render(<Error title="An error occurred" errors={errors} />);
    for (const error of errors) {
      const errorElement = await screen.findByText(error);
      expect(errorElement).toBeInTheDocument();
    }
  });

  test('does not render the confirmation button if onConfirm is not provided', () => {
    render(<Error title="An error occurred" errors={[]} />);
    const button = screen.queryByRole('button', { name: 'Okay' });
    expect(button).not.toBeInTheDocument();
  });

  test('renders the confirmation button and calls onConfirm when clicked', async () => {
    const onConfirm = vi.fn();
    render(<Error title="An error occurred" errors={[]} onConfirm={onConfirm} />);
    const button = screen.getByRole('button', { name: 'Okay' });
    await userEvent.click(button);
    expect(onConfirm).toHaveBeenCalled();
  });
});
