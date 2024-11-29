import React, { useEffect, useRef, useState } from 'react'

export const useOptions = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const optionsRef = useRef<HTMLDivElement>(null)

  const [isOpenBanModal, setIsOpenBanModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const handleConfirmDelete = () => {
    setIsOpenDeleteModal(false)
  }
  const handleConfirmBan = () => {
    setIsOpenBanModal(false)
  }

  const toggleOptions = () => {
    setIsOpen(prev => !prev)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return {
    handleConfirmBan,
    handleConfirmDelete,
    isOpen,
    isOpenBanModal,
    isOpenDeleteModal,
    optionsRef,
    setIsOpen,
    setIsOpenBanModal,
    setIsOpenDeleteModal,
    toggleOptions,
  }
}
