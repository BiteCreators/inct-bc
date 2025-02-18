import { RefObject, useEffect, useRef, useState } from 'react'

import { followersApi } from '@/entities/followers'
import { UsersInfo } from '@/entities/followers/types/followers.types'
import { useIntersectionObserver, useScopedTranslation } from '@byte-creators/utils'
import { useSearchParams } from 'next/navigation'

export const useUsersSearch = () => {
  const tNav = useScopedTranslation('Navigation')
  const tCommon = useScopedTranslation('Common')
  const [endCursorId, setEndCursorId] = useState<number | undefined>(undefined)
  const [hasMore, setHasMore] = useState(true)
  const searchQuery = useSearchParams().get('search') || ''

  const { data, isFetching, isLoading } = followersApi.useGetUsersInfoQuery({
    cursor: endCursorId,
    search: searchQuery,
  })

  const triggerRef = useRef<HTMLDivElement>(null)

  useIntersectionObserver(triggerRef as RefObject<Element>, () => {
    if (triggerRef.current && !isFetching && data && hasMore) {
      setHasMore(data.nextCursor !== null)
      setEndCursorId(prevState => data.nextCursor ?? prevState)
    }
  })

  return {
    isLoading,
    tCommon,
    tNav,
    triggerRef,
    users: data,
  }
}
