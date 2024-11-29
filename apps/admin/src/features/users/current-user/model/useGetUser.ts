import { GET_USER } from '@/features/users/current-user/model/userQueries'
import { useQuery } from '@apollo/client'

export const useGetUser = (userId: number) => {
  const { data, error, loading } = useQuery(GET_USER, {
    fetchPolicy: 'no-cache',
    variables: { userId },
  })

  return { data, error, loading }
}
