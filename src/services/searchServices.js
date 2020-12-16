import {gql} from '@apollo/client'
import {client} from './requestServices'

export function getTopWords(category) {
  return client.query({
    query: gql`
      query {
        ml @rest(type: "Keyword", path: "words?ml=${category}") {
          word,
          score
        }
      }
    `
  })
}
