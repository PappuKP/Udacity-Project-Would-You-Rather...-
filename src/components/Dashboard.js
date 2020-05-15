import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router"
import Question from "./Question"
import { Tab, Tabs } from 'react-bootstrap'

class Dashboard extends Component {

  onShowPollClicked = (e, qid) => {
    this.props.history.push(`/questions/${ qid }`)
  }


  render() {
    const { answered, unanswered } = this.props

    return (
      <Tabs defaultActiveKey="non-answered" id="uncontrolled-tab-example">
        <Tab eventKey="non-answered" title="Not Answered">
          <div className='card-columns container'>
            {
              unanswered.map((qid) =>
                <Question key={ qid } id={ qid } onShowPollClicked={ this.onShowPollClicked }/>
              )
            }
          </div>
        </Tab>
        <Tab eventKey="answered" title="Answered">
          <div className='card-columns container'>
            {
              answered.map((qid) =>
                <Question key={ qid } id={ qid } onShowPollClicked={ this.onShowPollClicked }/>
              )
            }
          </div>
        </Tab>
      </Tabs>
    )
  }
}


const mapStateToProps = ({ questions, users, authedUser }) => {
  const answersByAuthedUser = users[authedUser].answers
  return {
    questions,
    users,
    answered: Object.entries(questions).filter(([key, values]) => {
      return Object.keys(answersByAuthedUser).includes(key)
    }).sort(([key_a, val_a], [key_b, val_b]) => (val_b.timestamp - val_a.timestamp) ).map((entry) => entry[0]),
    unanswered: Object.entries(questions).filter(([key, values]) => {
      return !Object.keys(answersByAuthedUser).includes(key)
    }).sort(([key_a, val_a], [key_b, val_b]) => (val_b.timestamp - val_a.timestamp) ).map((entry) => entry[0])
  }
}

export default withRouter(connect(mapStateToProps)(Dashboard))