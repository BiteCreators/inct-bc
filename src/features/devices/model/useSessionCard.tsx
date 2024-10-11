import React from 'react'

import {
  Brave,
  BrowserPlaceholder,
  ChromeSvgrepoCom,
  Explorer,
  Firefox,
  MicrosoftEdge,
  Opera,
  Safari,
  UcBrowser,
  Yandex,
} from '@/common/assets/icons/components'

export const useSessionCard = ({
  browserName,
  lastVisit,
  type,
}: {
  browserName: string
  lastVisit?: string
  type: 'browser' | 'device'
}) => {
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

  if (type === 'device') {
    //no data to display for some reason
    //TODO: ask what to do with this
  }

  return {
    icon,
    lastVisitDate,
    title,
  }
}
