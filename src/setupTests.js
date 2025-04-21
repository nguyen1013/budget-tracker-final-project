import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock dialog methods not supported by JSDOM
HTMLDialogElement.prototype.showModal = vi.fn();
HTMLDialogElement.prototype.close = vi.fn();

// Create a modal root for portal rendering
beforeEach(() => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal');
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  const modalRoot = document.getElementById('modal');
  if (modalRoot) {
    modalRoot.remove();
  }
});