import { useUsersSearch } from '@/features/users-search/model/useUsersSearch'
import { UserAvatar } from '@/widgets/profile-header/ui/UserAvatar'
import { Typography } from '@byte-creators/ui-kit'
import { SearchComponent } from '@byte-creators/ui-kit/components'
import Link from 'next/link'

export const UsersSearch = () => {
  const { isLoading, tCommon, tNav, triggerRef, users } = useUsersSearch()

  return (
    <div className={'pl-6 pr-16'}>
      <Typography variant={'h1'}>{tNav.search}</Typography>
      <div className={'mt-4'}>
        <SearchComponent fullWidth paramName={'search'} />
      </div>
      {users?.items.length === 0 && !isLoading && (
        <Typography className={'text-light-900 leading-[24px] mt-5'}>
          {tCommon.errors.noItemsFound}
        </Typography>
      )}
      {users && (
        <div className={'mt-5'}>
          {users?.items.map(user => (
            <div className={'flex gap-3 mb-4'} key={user.id}>
              <UserAvatar
                className={'w-12'}
                isLoading={isLoading}
                src={user.avatars[0]?.url || ''}
              />
              <div>
                <Link href={`/profile/${user.id}`}>
                  <Typography
                    className={'text-light-100 font-bold leading-[24px]'}
                    variant={'regular-link'}
                  >
                    {user.userName}
                  </Typography>
                </Link>
                <Typography className={'text-light-900 leading-[24px]'} variant={'regular-text'}>
                  {user.firstName} {user.lastName}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className={'h-2'} ref={triggerRef} />
    </div>
  )
}
