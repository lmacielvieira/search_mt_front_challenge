import {ADD_KEYWORD, EDIT_KEYWORD, DELETE_KEYWORD} from '../mapping'

export function addKeyword(keyword) {
  return {
    type: ADD_KEYWORD,
    keyword
  }
}

export function editKeyword(index, info) {
  return {
    type: EDIT_KEYWORD,
    index,
    info
  }
}

export function deleteKeyword(index) {
  return {
    type: DELETE_KEYWORD,
    index
  }
}
