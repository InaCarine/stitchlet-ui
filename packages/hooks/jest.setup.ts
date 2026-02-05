import '@testing-library/jest-dom';

Object.defineProperty(global, 'BroadcastChannel', {
  writable: true,
  value: jest.fn().mockImplementation((name) => ({
    name,
    onmessage: null,
    postMessage: jest.fn(),
    close: jest.fn(),
  })),
});
