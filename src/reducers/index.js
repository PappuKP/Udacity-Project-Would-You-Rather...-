
import { combineReducers } from "redux"
import { loadingBarReducer } from "react-redux-loading"


import authedUser from "./authedUser"
import users from "./users"
import questions from "./questions"
import loading from "./loading"

export default combineReducers({
  authedUser,
  loading,
  users,
  questions,
  loadingBarReducer
})
