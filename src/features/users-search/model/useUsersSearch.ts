import { RefObject, useEffect, useRef, useState } from 'react'

import { followersApi } from '@/entities/followers'
import { UsersInfo } from '@/entities/followers/types/followers.types'
import { useIntersectionObserver, useScopedTranslation } from '@byte-creators/utils'
import { useSearchParams } from 'next/navigation'

export const useUsersSearch = () => {
  const tNav = useScopedTranslation('Navigation')
  const tCommon = useScopedTranslation('Common')
  const [users, setUsers] = useState<UsersInfo[]>([])
  const [endCursorId, setEndCursorId] = useState<number | undefined>(undefined)
  const [hasMore, setHasMore] = useState(true)
  const searchQuery = useSearchParams().get('search') || ''

  const { data, isLoading } = followersApi.useGetUsersInfoQuery(
    {
      cursor: endCursorId,
      search: searchQuery,
    }
    //{ skip: !searchQuery }
  )

  const triggerRef = useRef<HTMLDivElement>(null)

  useIntersectionObserver(triggerRef as RefObject<Element>, () => {
    if (triggerRef.current && !isLoading && data && hasMore) {
      setUsers(prevState => [...prevState, ...data.items])
      setHasMore(data.nextCursor !== null)
      setEndCursorId(data.nextCursor ?? undefined)
    }
  })

  useEffect(() => {
    setEndCursorId(undefined)
    setHasMore(true)
    setUsers([])
  }, [searchQuery])

  return {
    isLoading,
    tCommon,
    tNav,
    triggerRef,
    users,
  }
}
