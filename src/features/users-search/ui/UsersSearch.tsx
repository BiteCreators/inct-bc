import { RefObject, useEffect, useRef, useState } from 'react'

import { followersApi } from '@/entities/followers'
import { UsersInfo } from '@/entities/followers/types/followers.types'
import { UserAvatar } from '@/widgets/profile-header/ui/UserAvatar'
import { LinearLoader, Loader, LoaderBlock, Typography } from '@byte-creators/ui-kit'
import { SearchComponent } from '@byte-creators/ui-kit/components'
import { useIntersectionObserver, useScopedTranslation } from '@byte-creators/utils'
import Link from 'next/link'

export const UsersSearch = () => {
  const tNav = useScopedTranslation('Navigation')
  const tCommon = useScopedTranslation('Common')
  const [users, setUsers] = useState<UsersInfo[]>([])
  const [endCursorId, setEndCursorId] = useState<number | undefined>(undefined)
  const [hasMore, setHasMore] = useState(true)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { data, refetch } = followersApi.useGetUsersInfoQuery({
    cursor: endCursorId,
    pageSize: 20,
    search: searchQuery,
  })

  const triggerRef = useRef<HTMLDivElement>(null)

  const mergeUsers = (existingUsers: UsersInfo[], newUsers: UsersInfo[]): UsersInfo[] => {
    return [...existingUsers, ...newUsers]
  }

  const handleNewData = (newUsers: UsersInfo[], totalCount: number) => {
    setUsers(prevUsers => mergeUsers(prevUsers, newUsers))

    if (newUsers.length > 0) {
      const lastUserId = newUsers[newUsers.length - 1].id

      setEndCursorId(lastUserId)
    }

    if (users.length + newUsers.length >= totalCount) {
      setHasMore(false)
    }
  }

  const loadMore = async () => {
    if (!hasMore || isFetchingMore) {
      return
    }

    setIsFetchingMore(true)
    setIsLoading(true)

    const { data } = await refetch()

    if (data) {
      const newUsers = data.items
      const totalCount = data.totalCount

      handleNewData(newUsers, totalCount)
    }

    setIsFetchingMore(false)
    setIsLoading(false)
  }

  useIntersectionObserver(triggerRef as RefObject<Element>, () => {
    if (triggerRef.current && hasMore && !isFetchingMore) {
      loadMore()
    }
  })

  useEffect(() => {
    setUsers([])
    setHasMore(true)
    setEndCursorId(undefined)
  }, [searchQuery])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
  }

  return (
    <div className={'pl-6 pr-16'}>
      <Typography variant={'h1'}>{tNav.search}</Typography>
      <div className={'mt-4'}>
        <SearchComponent fullWidth handleSearchButtonClick={handleSearch} />
      </div>
      {users.length === 0 && !isLoading && (
        <Typography className={'text-light-900 leading-[24px] mt-5'}>
          {tCommon.errors.noItemsFound}
        </Typography>
      )}
      {users.length > 0 && (
        <div className={'mt-5'}>
          {users.map(user => (
            <div className={'flex gap-3 mb-4'} key={user.id}>
              <UserAvatar className={'w-12'} isLoading={false} src={user.avatars[0]?.url || ''} />
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
      {/*<LinearLoader isLoading={isLoading} />*/}
      {/*{(isFetchingMore || isLoading) && <LoaderBlock />}*/}
      <div className={'h-3'} ref={triggerRef} />
    </div>
  )
}
