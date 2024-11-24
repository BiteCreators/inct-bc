import { useRef } from 'react'

import { fireEvent, render, renderHook, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { AddPhotoModal } from '../ui/AddPhotoModal'

jest.mock('next/router', () => ({
  useRouter: () => ({
    locale: 'en',
  }),
}))

describe('AddPhotoModal', () => {
  const fakeUpload = jest.fn()
  const fakeFileSelect = jest.fn()
  const { result } = renderHook(() => useRef<HTMLInputElement>(null))

  it('should render as expected', () => {
    render(
      <AddPhotoModal
        fileInputRef={result.current}
        handleFileSelect={fakeFileSelect}
        uploadImage={fakeUpload}
      />
    )

    const dropZone = screen.getByTestId('drop-zone')
    const input = screen.getByRole('file-input')
    const uploadButton = screen.getByText(/select from computer/i)
    const draftButton = screen.getByText(/open draft/i)

    expect(input).toBeInTheDocument()
    expect(dropZone).toBeInTheDocument()
    expect(uploadButton).toBeInTheDocument()
    expect(draftButton).toBeInTheDocument()
  })

  it('should call uploadImage on button click', async () => {
    render(
      <AddPhotoModal
        fileInputRef={result.current}
        handleFileSelect={fakeFileSelect}
        uploadImage={fakeUpload}
      />
    )

    const uploadButton = screen.getByText(/select from computer/i)

    await userEvent.click(uploadButton)

    expect(fakeUpload).toHaveBeenCalled()
    expect(fakeUpload).toHaveBeenCalledTimes(1)
  })

  it('should call handleFileSelect after file selection', async () => {
    const fileOne = new File(['test-file'], 'test-file.png', { type: 'image/png' })
    const fileTwo = new File(['test-file'], 'test-file.png', { type: 'image/png' })

    render(
      <AddPhotoModal
        fileInputRef={result.current}
        handleFileSelect={fakeFileSelect}
        uploadImage={fakeUpload}
      />
    )

    const dropZone = screen.getByTestId('drop-zone')
    const input = screen.getByRole('file-input')

    fireEvent.drop(dropZone, {
      dataTransfer: { files: [fileOne] },
    })

    expect(fakeFileSelect).toHaveBeenCalledWith(fileOne)

    await userEvent.upload(input, fileTwo)

    expect(fakeFileSelect).toHaveBeenCalledWith(fileTwo)
  })
})
