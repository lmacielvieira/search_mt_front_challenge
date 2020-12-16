import update from 'immutability-helper'
import {ADD_KEYWORD, EDIT_KEYWORD, DELETE_KEYWORD} from '../mapping'

const INITIAL_STATE = {
  keywords: {
    cars: ['audi', 'bmw', 'tires'],
    bikes: ['bianchi'],
    fruit: ['banana', 'avocado'],
    animals: ['cat', 'dog', 'otter'],
    drinks: ['tea', 'water']
  }
}

export default function keywordsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_KEYWORD:
      return update(state, {
        keywords: {
          $push: [action.keyword]
        }
      })
    case DELETE_KEYWORD:
      return update(state, {
        keywords: {
          $splice: [[action.index, 1]]
        }
      })
    case EDIT_KEYWORD:
      return update(state, {
        keywords: {
          [action.index]: {
            $set: action.info
          }
        }
      })
    default:
      return state
  }
}
