import { AppLogo } from '@/features/navigation'
import { AppBar } from '@packages/shared/ui'

export const Header = () => {
  return <AppBar logo={<AppLogo />} />
}
