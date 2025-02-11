import { RefObject, useEffect, useRef, useState } from 'react'

import { followersApi } from '@/entities/followers'
import { UsersInfo } from '@/entities/followers/types/followers.types'
import { UserAvatar } from '@/widgets/profile-header/ui/UserAvatar'
import { LinearLoader, Loader, LoaderBlock, Typography } from '@byte-creators/ui-kit'
import { SearchComponent } from '@byte-creators/ui-kit/components'
import { useIntersectionObserver, useScopedTranslation } from '@byte-creators/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export const UsersSearch = () => {
  const tNav = useScopedTranslation('Navigation')
  const tCommon = useScopedTranslation('Common')
  const [users, setUsers] = useState<UsersInfo[]>([])
  const [endCursorId, setEndCursorId] = useState<number | undefined>(undefined)
  const [hasMore, setHasMore] = useState(true)
  //const [isFetchingMore, setIsFetchingMore] = useState(false)
  const searchQuery = useSearchParams().get('search') || ''

  const { data, isLoading } = followersApi.useGetUsersInfoQuery(
    {
      cursor: endCursorId,
      search: searchQuery,
    },
    { skip: !searchQuery }
  )

  const triggerRef = useRef<HTMLDivElement>(null)

  useIntersectionObserver(triggerRef as RefObject<Element>, () => {
    if (triggerRef.current && hasMore && !isLoading && data) {
      // @ts-ignore
      setEndCursorId(data.nextCursor)
    }
  })

  useEffect(() => {
    setUsers([])
    setHasMore(true)
    setEndCursorId(undefined)
  }, [searchQuery])

  return (
    <div className={'pl-6 pr-16'}>
      <Typography variant={'h1'}>{tNav.search}</Typography>
      <div className={'mt-4'}>
        <SearchComponent fullWidth paramName={'search'} />
      </div>
      {users.length === 0 && !isLoading && (
        <Typography className={'text-light-900 leading-[24px] mt-5'}>
          {tCommon.errors.noItemsFound}
        </Typography>
      )}
      {data && (
        <div className={'mt-5'}>
          {data.items.map(user => (
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
      <div className={'h-3 bg-red-800'} ref={triggerRef} />
    </div>
  )
}

//import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
//
// import { followersApi } from '@/entities/followers'
// import { UsersInfo } from '@/entities/followers/types/followers.types'
// import { UserAvatar } from '@/widgets/profile-header/ui/UserAvatar'
// import { Typography } from '@byte-creators/ui-kit'
// import { SearchComponent } from '@byte-creators/ui-kit/components'
// import { useIntersectionObserver, useScopedTranslation } from '@byte-creators/utils'
// import Link from 'next/link'
// import { useSearchParams } from 'next/navigation'
//
// export const UsersSearch = () => {
//   const tNav = useScopedTranslation('Navigation')
//   const tCommon = useScopedTranslation('Common')
//   const [users, setUsers] = useState<UsersInfo[]>([])
//   const [endCursorId, setEndCursorId] = useState<number | undefined>(undefined)
//   const [hasMore, setHasMore] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const triggerRef = useRef<HTMLDivElement>(null)
//   const searchQuery = useSearchParams().get('search') || ''
//
//   const { data, isLoading, refetch } = followersApi.useGetUsersInfoQuery(
//     { cursor: endCursorId, search: searchQuery },
//     { skip: !searchQuery }
//   )
//
//   useEffect(() => {
//     setUsers([])
//     setEndCursorId(undefined)
//     setHasMore(true)
//   }, [searchQuery])
//
//   useEffect(() => {
//     if (data) {
//       const newUsers = data.items
//
//       setUsers(prev => [...prev, ...newUsers])
//       setHasMore(data.nextCursor !== null)
//       setEndCursorId(data.nextCursor ?? undefined)
//     }
//   }, [data, searchQuery])
//
//   const loadMoreData = useCallback(() => {
//     if (hasMore && !loading) {
//       setLoading(true)
//       refetch()
//     }
//   }, [hasMore, loading, refetch])
//
//   useIntersectionObserver(triggerRef as RefObject<Element>, loadMoreData, {
//     root: null,
//     rootMargin: '0px',
//     threshold: 1.0,
//   })
//
//   useEffect(() => {
//     if (!isLoading && data) {
//       setLoading(false)
//     }
//   }, [isLoading, data])
//
//   return (
//     <div className={'pl-6 pr-16'}>
//       <Typography variant={'h1'}>{tNav.search}</Typography>
//       <div className={'mt-4'}>
//         <SearchComponent fullWidth paramName={'search'} />
//       </div>
//       {users.length === 0 && !isLoading && (
//         <Typography className={'text-light-900 leading-[24px] mt-5'}>
//           {tCommon.errors.noItemsFound}
//         </Typography>
//       )}
//       {users.length > 0 && (
//         <div className={'mt-5'}>
//           {users.map(user => (
//             <div className={'flex gap-3 mb-4'} key={user.id}>
//               <UserAvatar className={'w-12'} isLoading={false} src={user.avatars[0]?.url || ''} />
//               <div>
//                 <Link href={`/profile/${user.id}`}>
//                   <Typography
//                     className={'text-light-100 font-bold leading-[24px]'}
//                     variant={'regular-link'}
//                   >
//                     {user.userName}
//                   </Typography>
//                 </Link>
//                 <Typography className={'text-light-900 leading-[24px]'} variant={'regular-text'}>
//                   {user.firstName} {user.lastName}
//                 </Typography>
//               </div>
//             </div>
//           ))}
//           <div className={'h-3 bg-red-800'} ref={triggerRef} />
//         </div>
//       )}
//       {/*{isLoading && <div>Загрузка...</div>}*/}
//     </div>
//   )
// }
