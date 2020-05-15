import React, { Component } from 'react'
import { connect } from 'react-redux'


class Question extends Component {

  getCardClassNameRandomly = () => {
    const choices = [
      "card text-white bg-primary mb-3",
      "card text-white bg-secondary mb-3",
      "card text-white bg-success mb-3",
      "card text-white bg-danger mb-3",
      "card text-white bg-warning mb-3",
      "card text-white bg-info mb-3",
      "card bg-light mb-3",
      "card text-white bg-dark mb-3"
    ]
    return choices[Math.floor(Math.random()*choices.length)]
  }

  render() {
    const { question, author, id, onShowPollClicked, authedUser } = this.props

    return (
      <div className={ this.getCardClassNameRandomly() }>
        <div className='card-body'>
          <img className="card-img-top" src= { author.avatarURL } alt="card-avatar"/>
          <h5 className="card-title"> { authedUser === author.id ? <strong> You </strong> : author.name } asked a question:  </h5>
          <h6 className="card-subtitle"> Would you rather: </h6>
          <p className="card-text"> { `${ question.optionOne.text } vs ${ question.optionTwo.text }` } </p>
          <button className='card-link' onClick={ (e) => onShowPollClicked(e, id) }> View Poll </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser, questions, users }, { id }) => {
  const question = questions[id]
  return {
    question: question,
    author: users[question.author],
    id: id,
    authedUser
  }
}

export default connect(mapStateToProps)(Question)