import { cn } from '@/common/lib/utils/cn'
import { LogoutButton } from '@/features/auth'
import { SideNavbar } from '@/features/navigation'

export const Sidebar = () => {
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
