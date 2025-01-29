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
  return (
    <nav className={'p-[18px] border-t border-t-dark-300 bg-dark-700'}>
      <ul className={'flex gap-9 justify-center'}>
        <MobileAppMenuItem href={'/'} icon={<HomeOutline />} iconActive={<Home />} />
        <MobileAppMenuItem
          href={'/create'}
          icon={<PlusSquareOutline />}
          iconActive={<PlusSquare />}
        />
        <MobileAppMenuItem href={'/profile'} icon={<PersonOutline />} iconActive={<Person />} />
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
