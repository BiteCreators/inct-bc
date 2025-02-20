import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { authSlice } from '@/entities/auth'
import { createPostSlice } from '@/entities/posts/model/createPostSlice'
import { SideNavbarItem } from '@byte-creators/ui-kit'
import {
  Bookmark,
  BookmarkOutline,
  Home,
  HomeOutline,
  MessageCircle,
  MessageCircleOutline,
  Person,
  PersonOutline,
  PlayCircle,
  PlayCircleOutline,
  PlusSquare,
  PlusSquareOutline,
  Search,
  SearchOutline,
  TrendingUp,
  TrendingUpOutline,
} from '@byte-creators/ui-kit/icons'
import { useScopedTranslation } from '@byte-creators/utils'

export const SideNavbar = () => {
  const t = useScopedTranslation('Navigation')
  const userId = useAppSelector(authSlice.selectors.selectUserId)
  const dispatch = useAppDispatch()

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
          onClick={() => dispatch(createPostSlice.actions.setIsOpenCreatePost(true))}
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
        {/*<SideNavbarItem*/}
        {/*  href={'/games'}*/}
        {/*  icon={<PlayCircleOutline />}*/}
        {/*  iconActive={<PlayCircle />}*/}
        {/*  label={'Games'}*/}
        {/*/>*/}
      </div>
    </nav>
  )
}
