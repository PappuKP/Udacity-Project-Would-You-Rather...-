
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router"
import { generateUID } from "../utils"
import { handleAddQuestion } from "../actions/questions"
import LoginWindow from "./LoginWindow"

class NewQuestion extends Component {

  onSubmitNewQuestion = (e) => {
    e.preventDefault()
    let first = this.firstOption.value
    let second = this.secondOption.value
    const { dispatch, history, authedUser } = this.props

    if (first.length === 0 || second.length === 0) {
      alert("Options cannot be empty!")
      return
    }

    this.firstOption.value = ''
    this.secondOption.value = ''

    const id = generateUID()
    const date = new Date()
    const question = {
      author: authedUser,
      id: id,
      optionOneText: first,
      optionTwoText: second,
      timestamp: date.getTime()
    }

    dispatch(handleAddQuestion(question)).then(
      history.push('/')
    )
  }

  render() {
    return (
      <LoginWindow>
        <div>
          <h3 className='center'> Create New Question </h3>
          <p> Complete the question: </p>
          <div>
            <strong> Would you rather: </strong>
            <ul className='options'>
              <li key='first'>
                <input type='text' placeholder='Enter Option One Text Here' ref={ (e) => this.firstOption = e }/>
              </li>
              <li key='second'>
                <input type='text' placeholder='Enter Option Two Text Here' ref={ (e) => this.secondOption = e }/>
              </li>
            </ul>


            <button onClick={ (e) => this.onSubmitNewQuestion(e) }> Submit </button>
          </div>
        </div>
      </LoginWindow>
    )
  }
}

const mapStateToProps = ( { authedUser } ) => {
  return { authedUser }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))