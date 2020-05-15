import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter} from 'react-router-dom'
import { unsetAuthedUser } from "../actions/authedUser"

class Nav extends Component {

  onLogout = (e) => {
    e.preventDefault()

    const { dispatch, history } = this.props
    dispatch(unsetAuthedUser())
    history.push('/')
  }


  render() {
    const { authedUser } = this.props

    return (
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <Link to='/' className="navbar-brand"> WouldYouRather </Link>

          <div className="navbar-expand" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <Link to='/'>
                <li className='nav-item active'>
                  <strong> Home </strong>
                </li>
              </Link>
              <Link to='/add'>
                <li className='nav-item active'>
                  New Questions
                </li>
              </Link>
              <Link to='/leaderboard'>
                <li className='nav-item active'>
                  Leader Board
                </li>
              </Link>
              {
                authedUser === '' ? null :
                  <li className='nav-item active' onClick={ (e) => { this.onLogout(e) } }> Log out
                  </li>
              }
            </ul>


          </div>

          { authedUser !== '' &&
          <Link className="navbar-brand" to='/'>
            <img src={ this.props.authedUserObj.avatarURL } className="avatar" alt="avatar" />
          </Link>
          }
        </nav>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser, users }) => {
  return { authedUser, authedUserObj: authedUser === "" ? null : users[authedUser]  }
}

export default withRouter(connect(mapStateToProps)(Nav))