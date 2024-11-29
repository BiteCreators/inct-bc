import { useCookies } from 'react-cookie'

import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
})

const authLink = new ApolloLink((operation, forward) => {
  // const [cookies] = useCookies(['adminEmail', 'adminPassword'])

  // if (cookies.adminEmail && cookies.adminPassword) {
  operation.setContext({
    // headers: {
    //   Authorization: `Basic ${btoa(`${cookies.adminEmail}:${cookies.adminPassword}`)}`,
    // },
    headers: {
      Authorization: `Basic ${document.cookie.split('adminAccessToken=')[1]}`,
      // Authorization: `Basic ${btoa('admin@gmail.com:admin')}`,
    },
  })
  // }

  return forward(operation)
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})
