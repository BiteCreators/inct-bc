import React from 'react'

import { useLogout } from '@/features/auth/lib/hooks/useLogout'
import { LogOut } from '@packages/shared/assets'
import { useScopedTranslation } from '@packages/shared/hooks'
import { ActionConfirmation } from '@packages/shared/ui/action-confirmation/ActionComfiirmation'
import { LoaderBlock } from '@packages/shared/ui/loader/LoaderBlock'
import { cn } from '@packages/shared/utils'

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
