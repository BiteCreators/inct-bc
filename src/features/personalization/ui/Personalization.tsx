import React from 'react'

import { useLoaderOptions } from '@/features/personalization'
import { Alert, Card, RadioGroup, Typography } from '@byte-creators/ui-kit'

export const Personalization = () => {
  const { alertState, handleAlertClose, handleLoaderChange, loaderOptions, selectedLoader, t } =
    useLoaderOptions()

  return (
    <div className={'flex flex-col gap-10 text-sm relative lg:flex-row'}>
      <div>
        <Typography className={'font-weight600 mb-2'} variant={'h3'}>
          {t.title}
        </Typography>

        <Card className={'flex flex-col mb-10'}>
          <RadioGroup
            defaultValue={selectedLoader}
            onChange={handleLoaderChange}
            options={loaderOptions}
          />
        </Card>

        <Alert
          canClose
          className={'mt-4'}
          duration={4000}
          message={alertState.message}
          onClose={handleAlertClose}
          open={alertState.visible}
          purpose={'toast'}
          type={alertState.type}
        />
      </div>
    </div>
  )
}
