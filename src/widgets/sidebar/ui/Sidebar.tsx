import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { authSlice } from '@/entities/auth'
import { LogoutButton } from '@/features/auth'
import { SideNavbar } from '@/features/navigation'
import { cn } from '@byte-creators/utils'

export const Sidebar = () => {
  const accessToken = useAppSelector(authSlice.selectors.selectAccessToken)

  if (!accessToken) {
    return null
  }

  return (
    <div
      className={cn(
        'flex flex-col justify-between',
        'min-h-[calc(100vh-60px)] pt-[72px] pl-[60px] pb-9',
        'border-r border-r-dark-300'
      )}
    >
      <SideNavbar />
      <LogoutButton />
    </div>
  )
}
