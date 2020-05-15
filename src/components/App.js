import React, { Component } from 'react'
import { connect } from 'react-redux'


import LoginWindow from "./LoginWindow"
import Dashboard from "./Dashboard"
import NewQuestion from "./NewQuestion"
import Nav from "./Nav"
import Poll from "./Poll"

import handleInitialData from "../actions/shared"

import '../App.css'
import { LoadingBar } from "react-redux-loading"
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import Leaderboard from "./Leaderboard"

import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from "./NotFound"

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
  }

  render() {
    const { loading, authedUser } = this.props
    return (
      <div className='container'>
        <BrowserRouter>
          <LoadingBar/>
          <div className='Navbar'>
            <Nav/>
          </div>
          <hr/>
          <div className='Content'>
            {
              loading === true ? null :
              <Switch>
                <Route path='/' exact component={ authedUser === "" ? LoginWindow : Dashboard }/>
                <Route path='/add' exact component={ NewQuestion }/>
                <Route path='/questions/:id' exact component={ Poll } />
                <Route path='/leaderboard' exact component={ Leaderboard }/>
                <Route path='*' exact component={ NotFound }/>
              </Switch>
            }
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = ({ loading, authedUser }) => {
  return { loading, authedUser }
}

export default connect(mapStateToProps)(App)
