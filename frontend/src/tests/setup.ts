import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from '@/tests/msw/server';
import { resetMockVideos } from '@/tests/msw/handlers';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  resetMockVideos();
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});
