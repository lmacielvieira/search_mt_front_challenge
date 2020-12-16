import {ADD_KEYWORD, EDIT_KEYWORD, DELETE_KEYWORD} from '../mapping'

export function addKeyword(category, keyword) {
  return {
    type: ADD_KEYWORD,
    category,
    keyword
  }
}

export function editKeyword(id, category, keyword) {
  return {
    type: EDIT_KEYWORD,
    id,
    category,
    keyword
  }
}

export function deleteKeyword(index) {
  return {
    type: DELETE_KEYWORD,
    index
  }
}
