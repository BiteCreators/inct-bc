import { useState } from 'react'

import { SortDirection } from '@/common/__generated-types__/graphql'
import { GET_FOLLOWERS } from '@/features/user/followers/model/followersQueries'
import { useQuery } from '@apollo/client'
import { useScopedTranslation } from '@packages/shared/hooks'
import { useRouter } from 'next/router'

export const useFollowers = () => {
  const { query } = useRouter()
  const t = useScopedTranslation('FollowersAdmin')

  const [sortBy, setSortBy] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)
  const [sortDirectionBtnUserName, setSortDirectionBtnUserName] = useState<'asc' | 'desc' | null>(
    null
  )
  const [sortDirectionBtnDate, setSortDirectionBtnDate] = useState<'asc' | 'desc' | null>('desc')

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const { data, error, loading } = useQuery(GET_FOLLOWERS, {
    fetchPolicy: 'no-cache',
    variables: { pageNumber, pageSize, sortBy, sortDirection, userId: query.id ? +query.id : 737 },
  })

  const tableHeaderData = [
    {
      name: t.userId,
    },
    {
      name: t.userName,
      onClickSortButton: () => {
        setSortBy('userName')
        setSortDirection(
          sortDirection === SortDirection.Desc ? SortDirection.Asc : SortDirection.Desc
        )
        setSortDirectionBtnUserName(sortDirection === SortDirection.Desc ? 'desc' : 'asc')
        setSortDirectionBtnDate(null)
      },
      sort: sortDirectionBtnUserName,
    },
    { name: t.profileLink },
    {
      name: t.subscriptionDate,
      onClickSortButton: () => {
        setSortBy('createdAt')
        setSortDirection(
          sortDirection === SortDirection.Desc ? SortDirection.Asc : SortDirection.Desc
        )
        setSortDirectionBtnDate(sortDirection === SortDirection.Desc ? 'asc' : 'desc')
        setSortDirectionBtnUserName(null)
      },
      sort: sortDirectionBtnDate,
    },
  ]

  const handlerPageSize = (pagesPortion: string) => setPageSize(+pagesPortion)
  const handlerPageNumber = (page: number) => setPageNumber(page)

  return {
    data,
    error,
    handlerPageNumber,
    handlerPageSize,
    loading,
    pageNumber,
    pageSize,
    tableHeaderData,
  }
}
