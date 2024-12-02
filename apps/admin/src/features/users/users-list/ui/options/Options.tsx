import { useEffect, useRef, useState } from 'react'

import { Block, MoreHorizontalOutline, PersonRemoveOutline } from '@packages/shared/assets'

import s from './style.module.scss'

import { useOptions } from '../../model/useOptions'
import { ActionConfirmations } from '../modals/ActionConfirmations'

type Props = {
  firstName?: string
  lastName?: string
}

export const Options = ({ firstName, lastName }: Props) => {
  const {
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
  } = useOptions()

  return (
    <div className={s.options} ref={optionsRef}>
      <button className={`${s.toggle} ${isOpen ? s.active : ''}`} onClick={toggleOptions}>
        <MoreHorizontalOutline />
      </button>
      <ul className={`${s.list} ${isOpen ? s.active : ''}`}>
        <li>
          <button
            className={s.btn}
            onClick={() => {
              setIsOpen(false)
              setIsOpenDeleteModal(true)
            }}
          >
            <PersonRemoveOutline />
            Delete User
          </button>
        </li>
        <li>
          <button
            className={s.btn}
            onClick={() => {
              setIsOpen(false)
              setIsOpenBanModal(true)
            }}
          >
            <Block />
            Ban in the system
          </button>
        </li>
        <li>
          <button className={s.btn}>
            <MoreHorizontalOutline />
            More Information
          </button>
        </li>
      </ul>
      <ActionConfirmations
        firstName={firstName}
        handleConfirmBan={handleConfirmBan}
        handleConfirmDelete={handleConfirmDelete}
        isOpenBanModal={isOpenBanModal}
        isOpenDeleteModal={isOpenDeleteModal}
        lastName={lastName}
        setIsOpenBanModal={setIsOpenBanModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
      />
    </div>
  )
}
