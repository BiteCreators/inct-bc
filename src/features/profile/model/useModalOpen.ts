import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useRouter } from 'next/router'

export const useModalOpen = () => {
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'followers' | 'following'>('followers')
  const isAuthorized = useSelector((state: any) => !!state.auth.accessToken)
  const { id, modal } = router.query

  useEffect(() => {
    setIsModalOpen(false)
  }, [id])

  useEffect(() => {
    if (modal === 'followers' || modal === 'following') {
      setModalType(modal)
      setIsModalOpen(true)
    } else {
      setIsModalOpen(false)
    }
  }, [modal])

  const handleOpenModal = (type: 'followers' | 'following') => {
    if (!isAuthorized) {
      router.push(`/auth/sign-in`)

      return
    }
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
