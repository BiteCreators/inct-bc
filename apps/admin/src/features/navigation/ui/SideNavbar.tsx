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
import { useScopedTranslation } from '@packages/shared/hooks/useTranslation'
import { SideNavbarItem } from '@packages/shared/ui/sideNavbar/SideNavbarItem'

export const SideNavbar = () => {
  // const userId = useAppSelector(authSlice.selectors.selectUserId)
  //
  // if (!userId) {
  //   return null
  // }

  return (
    <nav className={'flex flex-col gap-[60px]'}>
      <div className={'flex flex-col gap-6'}>
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
