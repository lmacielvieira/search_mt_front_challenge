import {ApolloClient, InMemoryCache} from '@apollo/client'
import {RestLink} from 'apollo-link-rest'
import {ROUTES} from '../settings'

const restLink = new RestLink({
  uri: ROUTES.baseApi,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
})
