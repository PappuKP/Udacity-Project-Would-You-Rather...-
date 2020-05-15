
import { RECEIVE_USERS } from "../actions/users"
import { ADD_QUESTION, VOTE_QUESTION } from "../actions/questions"


export default function users (state = {}, action) {
  switch (action.type) {

    case RECEIVE_USERS:
      return action.users

    case ADD_QUESTION:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat([action.question.id])
        }
      }

    case VOTE_QUESTION:
      const { authedUser, qid, answer } = action.vote
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      }

    default:
      return state
  }
}