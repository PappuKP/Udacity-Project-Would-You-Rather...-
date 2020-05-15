
import { showLoading, hideLoading } from "react-redux-loading"
import { _getUsers, _getQuestions } from "../_DATA"
import { receiveUsers } from "./users"
import { receiveQuestions } from "./questions"
import { setLoading } from './loading'

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => ({users, questions})
  )
}

export default function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    getInitialData().then(({users, questions}) => {
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
      dispatch(hideLoading())
      dispatch(setLoading(false))
      console.log("Users: ", users)
      console.log("Questions: ", questions)
    })
  }
}

