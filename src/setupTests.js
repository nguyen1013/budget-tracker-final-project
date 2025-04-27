import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock dialog methods not supported by JSDOM
HTMLDialogElement.prototype.showModal = vi.fn();
HTMLDialogElement.prototype.close = vi.fn();

// Create modal & confirm roots for portal rendering
beforeEach(() => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal');
  document.body.appendChild(modalRoot);

  const confirmRoot = document.createElement('div');
  confirmRoot.setAttribute('id', 'confirm');
  document.body.appendChild(confirmRoot);
});

afterEach(() => {
  const modalRoot = document.getElementById('modal');
  if (modalRoot) modalRoot.remove();

  const confirmRoot = document.getElementById('confirm');
  if (confirmRoot) confirmRoot.remove();
});
