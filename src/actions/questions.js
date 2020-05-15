import { showLoading, hideLoading } from "react-redux-loading"
import {_saveQuestion, _saveQuestionAnswer} from "../_DATA"

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const VOTE_QUESTION = 'VOTE_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

// expect vote to be an object { authedUser, qid, answer }
export function voteQuestion(vote) {
  return {
    type: VOTE_QUESTION,
    vote
  }
}

export function handleAddQuestion(question) {
  return (dispatch) => {
    dispatch(showLoading())
    return _saveQuestion(question).then((question) => {
      return dispatch(addQuestion(question))
    }).then(() => hideLoading())
  }
}

export function handleVoteQuestion(vote) {
  return (dispatch) => {
    dispatch(showLoading())
    return _saveQuestionAnswer(vote).then(() => {
      return dispatch(voteQuestion(vote))
    }).then(() => hideLoading())
  }
}