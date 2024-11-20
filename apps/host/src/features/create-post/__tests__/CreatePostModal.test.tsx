import { Provider } from 'react-redux'

import { authSlice } from '@/entities/auth'
import { Store, configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import 'next/router'
import 'jose'

import { inctagramApi } from '../../../common/api/inct.api'
import { CreatePostModal } from '../ui/CreatePostModal'

jest.mock('next/router', () => ({
  useRouter: () => ({
    locale: 'en',
  }),
}))

jest.mock('jose', () => ({
  decodeJwt: () => ({
    userId: 1,
  }),
}))

describe('CreatePostModal', () => {
  let mockStore: Store

  beforeEach(() => {
    mockStore = configureStore({
      middleware: getDefautlMiddleware => getDefautlMiddleware().concat(inctagramApi.middleware),
      reducer: {
        auth: authSlice.reducer,
        [inctagramApi.reducerPath]: inctagramApi.reducer,
      },
    })
  })

  it('should initially render as expected', async () => {
    render(
      <Provider store={mockStore}>
        <CreatePostModal />
      </Provider>
    )

    expect(screen.getByTestId('add-photo-modal')).toBeInTheDocument()
    expect(screen.getByText(/add photo/i)).toBeInTheDocument()
  })

  it('should switch all the steps', async () => {
    const fileOne = new File(['test-file'], 'test-file.png', { type: 'image/png' })
    const fileTwo = new File(['test-file-two'], 'test-file-two.png', { type: 'image/png' })

    render(
      <Provider store={mockStore}>
        <CreatePostModal />
      </Provider>
    )
    expect(screen.getByTestId('add-photo-modal')).toBeInTheDocument()
    expect(screen.getByText(/add photo/i)).toBeInTheDocument()

    const addPhotoButton = screen.getByText(/select from computer/i)
    const input = screen.getByRole('file-input')

    await userEvent.click(addPhotoButton)
    await userEvent.upload(input, fileOne)

    expect(screen.getByText(/add photo/i)).toBeInTheDocument()
    // expect(screen.queryByText('add-photo-modal')).not.toBeInTheDocument()
  })
})
