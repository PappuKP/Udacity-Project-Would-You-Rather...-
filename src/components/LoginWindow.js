
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from "../actions/authedUser"
import { withRouter } from 'react-router-dom'

class LoginWindow extends Component {

  state = {
    selectedUserId: ''
  }


  onLogin = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(setAuthedUser(this.state.selectedUserId))
  }

  onChangeSelectedUser = (e) => {
    this.setState({ selectedUserId: e.target.value })
  }

  render() {
    const { users, authedUser } = this.props
    return authedUser === '' ? (
      <div>
        <div className='center'>
          <h3> Welcome to the Would You Rather App!</h3>
          <p> Please Sign in to Continue
            { this.props.children === undefined ? null : <span style={{ color: 'red' }}>  to the Requested Page  </span> }.
          </p>
        </div>

        <form onSubmit={ (e) => this.onLogin(e) }>
          <select onChange={ (e) => this.onChangeSelectedUser(e) } className="form-control" defaultValue="blank">
            <option disabled value="blank"> --- Please select your username. --- </option>
            { Object.entries(users).map(([id, values]) => ( <option key={ id }> { id }  </option> )) }
          </select>
          <div className='center'>
            <button className="btn btn-outline-dark">  Sign in  </button>
          </div>
        </form>
      </div>
    ) : this.props.children
  }
}

const mapStateToProps = ({ users, authedUser }) => {
  return { users, authedUser }
}

export default withRouter(connect(mapStateToProps)(LoginWindow))