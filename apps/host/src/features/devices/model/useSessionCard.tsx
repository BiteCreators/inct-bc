import React from 'react'

import {
  Brave,
  BrowserPlaceholder,
  ChromeSvgrepoCom,
  DesktopMac,
  Explorer,
  Firefox,
  MicrosoftEdge,
  Opera,
  PhoneIphone,
  Safari,
  UcBrowser,
  Yandex,
} from '@/common/assets/icons/components'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'

export const useSessionCard = ({
  browserName,
  lastVisit,
  osName,
  type,
}: {
  browserName: string
  lastVisit?: string
  osName?: string
  type: 'browser' | 'device'
}) => {
  const t = useScopedTranslation('Devices')
  let icon: React.ReactNode
  let title: string = 'test'
  let lastVisitDate: string | undefined = undefined

  if (lastVisit) {
    lastVisitDate = new Date(lastVisit).toLocaleDateString('en-GB')
  }

  if (type === 'browser') {
    title = browserName
    switch (browserName) {
      case 'Chrome':
        icon = <ChromeSvgrepoCom height={36} width={36} />
        break
      case 'Safari':
        icon = <Safari height={36} width={36} />
        break
      case 'Yandex':
        icon = <Yandex height={36} width={36} />
        break
      case 'Firefox':
        icon = <Firefox height={36} width={36} />
        break
      case 'Edge':
        icon = <MicrosoftEdge height={36} width={36} />
        break
      case 'Brave':
        icon = <Brave height={36} width={36} />
        break
      case 'Opera':
        icon = <Opera height={36} width={36} />
        break
      case 'UcBrowser':
        icon = <UcBrowser height={36} width={36} />
        break
      case 'Explorer':
        icon = <Explorer height={36} width={36} />
        break
      default:
        icon = <BrowserPlaceholder height={36} width={36} />
    }
  }

  if (type === 'device' && osName) {
    title = osName
    if (
      osName === 'Linux' ||
      osName === 'Windows' ||
      osName === 'Macintosh' ||
      osName === 'Intel Mac OS'
    ) {
      icon = <DesktopMac />
    } else {
      icon = <PhoneIphone />
    }
  }

  return {
    icon,
    lastVisitDate,
    t,
    title,
  }
}
