import { AppLogo } from '@/features/navigation'
import { AppBar } from '@packages/shared/ui'
import dynamic from 'next/dynamic'

// eslint-disable-next-line import/no-unresolved
const LanguageSelect = dynamic(() => import('host/language-select').then(mod => mod.LanguageSelect))

export const Header = () => {
  return <AppBar content={<LanguageSelect />} logo={<AppLogo />} />
}
