import { useEffect, useRef, useState } from 'react'

import { Block, MoreHorizontalOutline, PersonRemoveOutline } from '@packages/shared/assets'
import { Select, SelectItem } from '@packages/shared/ui'
import { ActionConfirmation } from '@packages/shared/ui/action-confirmation/ActionComfiirmation'

import s from './styles.module.scss'

type Props = {
  firstName?: string
  lastName?: string
}

export const Options = ({ firstName, lastName }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const optionsRef = useRef<HTMLDivElement>(null)

  const [isOpenBanModal, setIsOpenBanModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const messageDeleteModal = (
    <>
      Are you sure to delete user&nbsp;
      <span className={s.modal__name}>{`${firstName} ${lastName}`}</span>?
    </>
  )
  const messageBanModal = (
    <>
      Are you sure to ban this user,&nbsp;
      <span className={s.modal__name}>{`${firstName} ${lastName}`}</span>?
    </>
  )

  const toggleOptions = () => {
    setIsOpen(prev => !prev)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  const handleConfirmDelete = () => {
    setIsOpenDeleteModal(false)
  }
  const handleConfirmBan = () => {
    setIsOpenBanModal(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={s.options} ref={optionsRef}>
      <button className={`${s.options__toggle} ${isOpen ? s.active : ''}`} onClick={toggleOptions}>
        <MoreHorizontalOutline />
      </button>
      <ul className={`${s.options__list} ${isOpen ? s.active : ''}`}>
        <li>
          <button
            className={s.options__btn}
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
            className={s.options__btn}
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
          <button className={s.options__btn}>
            <MoreHorizontalOutline />
            More Information
          </button>
        </li>
      </ul>
      <ActionConfirmation
        classNameButtons={s.modal__btn}
        classNameMessage={s.modal__message}
        isOpen={isOpenDeleteModal}
        message={messageDeleteModal}
        onConfirm={handleConfirmDelete}
        onReject={() => {}}
        setIsOpen={setIsOpenDeleteModal}
        title={'Delete user'}
      />
      <ActionConfirmation
        classNameButtons={s.modal__btn}
        classNameMessage={s.modal__message}
        isOpen={isOpenBanModal}
        message={messageBanModal}
        onConfirm={handleConfirmBan}
        onReject={() => {}}
        setIsOpen={setIsOpenBanModal}
        title={'Ban user'}
      >
        <Select className={s.modal__select} placeholder={'Reason for ban'}>
          <SelectItem value={'1'}>Bad behavior</SelectItem>
          <SelectItem value={'2'}>Advertising placement</SelectItem>
          <SelectItem value={'3'}>Another reason</SelectItem>
        </Select>
      </ActionConfirmation>
    </div>
  )
}
