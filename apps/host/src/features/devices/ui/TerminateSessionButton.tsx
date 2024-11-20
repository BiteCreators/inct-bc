import { useState } from 'react'

import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { devicesApi } from '@/entities/devices'
import { LogOut } from '@packages/shared/assets/icons/components'
import { useScopedTranslation } from '@packages/shared/hooks/useTranslation'
import { Alert } from '@packages/shared/ui'

export const TerminateSessionButton = ({ deviceId }: { deviceId: number }) => {
  const [logOut] = devicesApi.useTerminateSessionByIdMutation()
  const { handleApiError } = useHandleApiError('Devices')
  const [apiError, setApiError] = useState('')
  const t = useScopedTranslation('Auth')

  const handleClick = async () => {
    try {
      logOut({ deviceId }).unwrap()
    } catch (error) {
      handleApiError({ error, setApiError })
    }
  }

  return (
    <>
      <button
        className={'flex gap-3 align-middle hover:text-primary-100 delay-75 transition-colors'}
        onClick={handleClick}
      >
        <LogOut /> {t.logOut}
      </button>
      {!!apiError && <Alert message={apiError} purpose={'toast'} type={'error'} />}
    </>
  )
}
