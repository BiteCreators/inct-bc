import { handlers } from '@/common/mocks/handlers'
import { setupServer } from 'msw/node'

import '@testing-library/jest-dom'

export const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
