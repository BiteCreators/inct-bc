import { useState } from 'react'

import { LogOut } from '@/common/assets/icons/components'
import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { Alert } from '@/common/ui'
import { devicesApi } from '@/entities/devices'

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
