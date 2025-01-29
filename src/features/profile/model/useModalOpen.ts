import { useState } from 'react'

import { useRouter } from 'next/router'

export const useModalOpen = () => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'followers' | 'following'>('followers')
  const handleOpenModal = (type: 'followers' | 'following') => {
    setModalType(type)
    setIsModalOpen(true)
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, modal: type },
      },
      undefined,
      { shallow: true }
    )
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    const { modal, ...rest } = router.query

    router.push(
      {
        pathname: router.pathname,
        query: rest,
      },
      undefined,
      { shallow: true }
    )
  }

  return { handleCloseModal, handleOpenModal, isModalOpen, modalType }
}
