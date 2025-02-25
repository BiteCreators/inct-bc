import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { authSlice } from '@/entities/auth'
import { selectUserId } from '@/entities/auth/model/auth.slice'
import {
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
} from '@byte-creators/ui-kit/icons'

import { MobileAppMenuItem } from './MobileAppMenuItem'

export const MobileAppMenu = () => {
  const userId = useAppSelector(selectUserId)

  return (
    <nav className={'p-[18px] border-t border-t-dark-300 bg-dark-700'}>
      <ul className={'flex gap-9 justify-center'}>
        <MobileAppMenuItem href={'/'} icon={<HomeOutline />} iconActive={<Home />} />
        <MobileAppMenuItem
          href={`/profile/${userId}/publications/create`}
          icon={<PlusSquareOutline />}
          iconActive={<PlusSquare />}
        />
        <MobileAppMenuItem
          href={userId ? `/profile/${userId}` : '/auth/sign-in'}
          icon={<PersonOutline />}
          iconActive={<Person />}
        />
        <MobileAppMenuItem href={'/search'} icon={<SearchOutline />} iconActive={<Search />} />
        <MobileAppMenuItem
          href={'/messenger'}
          icon={<MessageCircleOutline />}
          iconActive={<MessageCircle />}
        />
      </ul>
    </nav>
  )
}
