

import { SET_LOADING } from "../actions/loading"

export default function questions (state = true, action) {
  switch (action.type) {
    case SET_LOADING:
      return action.val
    default:
      return state
  }
}
