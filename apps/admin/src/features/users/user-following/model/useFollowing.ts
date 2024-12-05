import { useEffect, useState } from 'react'

import { SortDirection } from '@/common/__generated-types__/graphql'
import { useApolloClient, useQuery } from '@apollo/client'
import { TableHeader } from '@packages/shared/ui'
import { useRouter } from 'next/router'

import { GET_FOLLOWING } from './followingQueries'
import { GET_USER_DATA } from './userDataQueries'

interface UserProfile {
  __typename?: 'Profile'
  firstName?: null | string
  lastName?: null | string
}

interface User {
  __typename?: 'User'
  createdAt: any
  id: number
  profile: UserProfile
  userName: string
}

export const useFollowing = () => {
  const { query } = useRouter()

  const [sortBy, setSortBy] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)
  const [sortDirectionBtnUserName, setSortDirectionBtnUserName] = useState<'asc' | 'desc' | null>(
    null
  )
  const [sortDirectionBtnDate, setSortDirectionBtnDate] = useState<'asc' | 'desc' | null>('desc')

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const { data, error, loading } = useQuery(GET_FOLLOWING, {
    fetchPolicy: 'no-cache',
    variables: { pageNumber, pageSize, sortBy, sortDirection, userId: query.id ? +query.id : 1 },
  })

  //const client = useApolloClient()
  //const [usersData, setUsersData] = useState<User[]>([])

  //useEffect(() => {
  //  const fetchUsersData = async () => {
  //    const usersIds = data?.getFollowing.items.map(el => el.userId) || []

  //    if (usersIds.length === 0) {
  //      return
  //    }

  //    try {
  //      const userRequests = await Promise.all(
  //        usersIds.map(userId =>
  //          client.query({
  //            fetchPolicy: 'no-cache',
  //            query: GET_USER_DATA,
  //            variables: { userId },
  //          })
  //        )
  //      )
  //      const userDetails = userRequests.map(result => result.data.getUser)

  //      setUsersData(userDetails)
  //    } catch (error) {
  //      console.error('Error fetching user data:', error)
  //    }
  //  }

  //  fetchUsersData()
  //}, [client, data])

  const tableHeaderData: TableHeader[] = [
    {
      name: 'User ID',
    },
    {
      name: 'Username',
    },
    {
      name: 'Profile link',
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
    {
      name: 'Subscription Date',
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
