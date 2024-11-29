import {
  CreditCard,
  CreditCardOutline,
  Image,
  ImageOutline,
  Person,
  PersonOutline,
  TrendingUp,
  TrendingUpOutline,
} from '@packages/shared/assets'
import { SideNavbarItem } from '@packages/shared/ui/sideNavbar/SideNavbarItem'

import cl from '../ui/styles/sideNavbar.module.scss'

export const SideNavbar = () => {
  // const userId = useAppSelector(authSlice.selectors.selectUserId)
  //
  // if (!userId) {
  //   return null
  // }

  return (
    <nav className={cl.nav}>
      <div className={cl.navItemContainer}>
        <SideNavbarItem
          href={'/'}
          icon={<PersonOutline />}
          iconActive={<Person />}
          label={'Users list'}
        />
        <SideNavbarItem
          href={`/`}
          icon={<TrendingUpOutline />}
          iconActive={<TrendingUp />}
          label={'Statistics'}
        />
        <SideNavbarItem
          href={'/messenger'}
          icon={<CreditCardOutline />}
          iconActive={<CreditCard />}
          label={'Payments list'}
        />
        <SideNavbarItem
          href={'/search'}
          icon={<ImageOutline />}
          iconActive={<Image />}
          label={'Posts list'}
        />
      </div>
    </nav>
  )
}
