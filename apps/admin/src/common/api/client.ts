import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
})

//todo: remove mock Authorization

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      // Authorization: `Basic ${document.cookie.split('adminAccessToken=')[1]}`,
      Authorization: `Basic ${btoa('admin@gmail.com:admin')}`,
    },
  })

  return forward(operation)
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})
