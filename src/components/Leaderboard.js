import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router"
import { CanvasJSChart } from '../canvasjs.react'
import LoginWindow from "./LoginWindow"


class Leaderboard extends Component {

  render() {
    const { rankedUsers } = this.props

    const scores = rankedUsers.map((user) => (Object.keys(user.answers).length + user.questions.length))

    const options = (username, answerNum, questionNum) => ({
      animationEnabled: true,

      title:{
        text: `Contribution by ${ username }`
      },
      axisX:{
        interval: 1
      },
      axisY2:{
        interlacedColor: "rgba(1,77,101,.2)",
        gridColor: "rgba(1,77,101,.1)",
        title: "Number of Times",
        maximum: Math.max(...scores)
      },
      data: [{
        type: "bar",
        name: "times",
        axisYType: "secondary",
        color: "#014D65",
        dataPoints: [
          { y: questionNum, label: "Questions posted" },
          { y: answerNum, label: "Answers given" },
          { y: answerNum + questionNum, label: "Total score" },
        ]
      }]
    })


    return (
      <LoginWindow>
        <div>
          <h3 className='center'> Leader Board </h3>
          {
            rankedUsers.map((user, idx) => (
                <div key={ user.id } className='center' >
                  <div className='container'>
                    <img className='avatar' src={ user.avatarURL } alt="avatar" />
                    <div> { `#${ idx + 1 }: ` } { user.name  } </div>
                    <div> Question answered: { Object.keys(user.answers).length } </div>
                    <div> Question asked: { user.questions.length } </div>
                    <div> Total score: { user.questions.length + Object.keys(user.answers).length } </div>
                    <CanvasJSChart options = { options(user.name, Object.keys(user.answers).length, user.questions.length) } />
                  </div>
                </div>
              )
            )
          }
        </div>
      </LoginWindow>
    )
  }
}


const mapStateToProps = ({ users, authedUser }) => {


  return {
    rankedUsers: Object.values(users).sort(
      (u1, u2) =>
      (u2.questions.length + Object.keys(u2.answers).length
        - u1.questions.length - Object.keys(u1.answers).length)
    ),
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(Leaderboard))