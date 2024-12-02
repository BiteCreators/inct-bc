import { SideNavbar } from '@/features/navigation/ui/SideNavbar'

import cl from '../ui/styles/Sidebar.module.scss'

export const Sidebar = () => {
  // const accessToken = useAppSelector(authSlice.selectors.selectAccessToken)
  //
  // if (!accessToken) {
  //   return null
  // }

  return (
    <div className={cl.navbarContainer}>
      <SideNavbar />
    </div>
  )
}
