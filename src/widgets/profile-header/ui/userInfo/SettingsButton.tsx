import React from 'react'

import { UserProfile } from '@/entities/followers/types/followers.types'
import { Button } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'
import Link from 'next/link'

export const SettingsButton = ({ profile }: { profile: UserProfile | undefined }) => {
  const t = useScopedTranslation('Navigation')

  return (
    <Button asChild className={'max-w-auto px-2 md:px-4 md:flex text-center'} variant={'secondary'}>
      <Link href={`/profile/${profile?.id}/settings`}>{t.profileSettings}</Link>
    </Button>
  )
}
