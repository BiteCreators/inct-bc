import React from 'react'

import { useLogout } from '@/features/auth/lib/hooks/useLogout'
import { ActionConfirmation, LoaderBlock } from '@byte-creators/ui-kit'
import { LogOut } from '@byte-creators/ui-kit/icons'
import { cn, useScopedTranslation } from '@byte-creators/utils'

export const LogoutButton = () => {
  const t = useScopedTranslation('Auth')

  const { confirmOpen, handleConfirm, handleLogout, handleReject, isLoading, me, setConfirmOpen } =
    useLogout()

  if (isLoading) {
    return (
      <div className={'flex justify-center items-center'}>
        <LoaderBlock portal />
      </div>
    )
  }

  return (
    <>
      <button
        className={cn(
          'flex gap-3 text-sm font-weight500',
          'transition-colors delay-[10ms]',
          'global-hover:hover:text-primary-100'
        )}
        onClick={handleLogout}
      >
        <LogOut /> {t.logOut}
      </button>
      <ActionConfirmation
        isOpen={confirmOpen}
        message={`${t.areYouSureYouWantToLogout} "${me?.email}"?`}
        onConfirm={handleConfirm}
        onReject={handleReject}
        setIsOpen={setConfirmOpen}
        title={t.logOut}
      />
    </>
  )
}
