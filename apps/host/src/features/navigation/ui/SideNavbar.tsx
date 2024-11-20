import { useCookies } from 'react-cookie'

import {
  Bookmark,
  BookmarkOutline,
  Home,
  HomeOutline,
  MessageCircle,
  MessageCircleOutline,
  Person,
  PersonOutline,
  PlusSquare,
  PlusSquareOutline,
  Search,
  SearchOutline,
  TrendingUp,
  TrendingUpOutline,
} from '@/common/assets/icons/components'
import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { authSlice } from '@/entities/auth'

import { SideNavbarItem } from './SideNavbarItem'

export const SideNavbar = () => {
  const t = useScopedTranslation('Navigation')
  const userId = useAppSelector(authSlice.selectors.selectUserId)

  if (!userId) {
    return null
  }

  return (
    <nav className={'flex flex-col gap-[60px]'}>
      <div className={'flex flex-col gap-6'}>
        <SideNavbarItem href={'/'} icon={<HomeOutline />} iconActive={<Home />} label={t.home} />
        <SideNavbarItem
          href={`/profile/${userId}/publications/create`}
          icon={<PlusSquareOutline />}
          iconActive={<PlusSquare />}
          label={t.create}
        />
        <SideNavbarItem
          href={`/profile/${userId}`}
          icon={<PersonOutline />}
          iconActive={<Person />}
          label={t.myProfile}
        />
        <SideNavbarItem
          href={'/messenger'}
          icon={<MessageCircleOutline />}
          iconActive={<MessageCircle />}
          label={t.messenger}
        />
        <SideNavbarItem
          href={'/search'}
          icon={<SearchOutline />}
          iconActive={<Search />}
          label={t.search}
        />
      </div>
      <div className={'flex flex-col gap-6'}>
        <SideNavbarItem
          href={'/statistics'}
          icon={<TrendingUpOutline />}
          iconActive={<TrendingUp />}
          label={t.statistics}
        />
        <SideNavbarItem
          href={'/favorites'}
          icon={<BookmarkOutline />}
          iconActive={<Bookmark />}
          label={t.favorites}
        />
      </div>
    </nav>
  )
}
