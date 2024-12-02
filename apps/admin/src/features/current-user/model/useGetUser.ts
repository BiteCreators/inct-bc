import { useQuery } from '@apollo/client'

import { GET_USER } from '../api/userQueries'

export const useGetUser = (userId: number) => {
  const { data, error, loading } = useQuery(GET_USER, {
    fetchPolicy: 'no-cache',
    variables: { userId },
  })

  return { data, error, loading }
}
