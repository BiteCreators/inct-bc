import React from 'react'

import { Select, SelectItem } from '@packages/shared/ui'
import { ActionConfirmation } from '@packages/shared/ui/action-confirmation/ActionComfiirmation'

import s from './styles.module.scss'

type Props = {
  firstName?: null | string
  handleConfirmBan: () => void
  handleConfirmDelete: () => void
  isOpenBanModal: boolean
  isOpenDeleteModal: boolean
  lastName?: null | string
  setIsOpenBanModal: (isOpen: boolean) => void
  setIsOpenDeleteModal: (isOpen: boolean) => void
}

export const ActionConfirmations = ({
  firstName,
  handleConfirmBan,
  handleConfirmDelete,
  isOpenBanModal,
  isOpenDeleteModal,
  lastName,
  setIsOpenBanModal,
  setIsOpenDeleteModal,
}: Props) => {
  const messageDeleteModal = (
    <>
      Are you sure to delete user&nbsp;
      <span className={s.name}>{`${firstName} ${lastName}`}</span>?
    </>
  )
  const messageBanModal = (
    <>
      Are you sure to ban this user,&nbsp;
      <span className={s.name}>{`${firstName} ${lastName}`}</span>?
    </>
  )

  return (
    <>
      <ActionConfirmation
        classNameButtons={s.btn}
        classNameMessage={s.message}
        isOpen={isOpenDeleteModal}
        message={messageDeleteModal}
        onConfirm={handleConfirmDelete}
        onReject={() => {}}
        setIsOpen={setIsOpenDeleteModal}
        title={'Delete user'}
      />
      <ActionConfirmation
        classNameButtons={s.btn}
        classNameMessage={s.message}
        isOpen={isOpenBanModal}
        message={messageBanModal}
        onConfirm={handleConfirmBan}
        onReject={() => {}}
        setIsOpen={setIsOpenBanModal}
        title={'Ban user'}
      >
        <Select placeholder={'Reason for ban'}>
          <SelectItem value={'1'}>Bad behavior</SelectItem>
          <SelectItem value={'2'}>Advertising placement</SelectItem>
          <SelectItem value={'3'}>Another reason</SelectItem>
        </Select>
      </ActionConfirmation>
    </>
  )
}
