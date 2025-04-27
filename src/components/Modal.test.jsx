import { render, screen } from '@testing-library/react';
import Modal from './Modal';
import Error from './Error';

describe('Modal component', () => {
  test('renders children when open is true', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <Error title="An error occurred" errors={[]} />
      </Modal>
    );

    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });

  test('does not render children when open is false', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        <Error title="An error occurred" errors={[]} />
      </Modal>
    );

    expect(screen.queryByText('Hidden Modal Content')).not.toBeInTheDocument();
  });

  test('calls onClose when the dialog is closed', () => {
    const handleClose = vi.fn();

    render(
      <Modal open={true} onClose={handleClose}>
        <Error title="An error occurred" errors={[]} />
      </Modal>
    );

    const dialog = document.querySelector('dialog');
    dialog.dispatchEvent(new Event('close'));

    expect(handleClose).toHaveBeenCalled();
  });
});
