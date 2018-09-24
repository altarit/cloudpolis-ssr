import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

// import {resizedWindow} from '../SideBar/modules/sideBar'
import { closeAllPopups, openPopup } from '../../modules/popups'
import { establishCurrentUser } from '../../modules/auth'
import { isServer } from '../../store'

import Header from '../Header'
import Routes from '../../routes/index'

import './App.css'

class App extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired,
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.currentState = props.store.getState().sidebar
    this.state = this.currentState || {}
  }


  resizeWindow = () => {
    // this.props.store.dispatch(resizedWindow())
  }

  changedSideBar = () => {
    const previousState = this.currentState
    const state = this.currentState = this.props.store.getState().sidebar
    if (previousState !== state && (previousState.isOpen !== state.isOpen || previousState.mobile !== state.mobile)) {
      this.setState(state)
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeWindow)
    this.props.store.subscribe(this.changedSideBar)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeWindow)
  }

  handleClick = (e) => {
    let target = e.target
    do {
      let dataClick = target.dataset && target.dataset.click
      if (dataClick) {
        switch (dataClick) {
          case 'dropdown':
            return this.props.store.dispatch(openPopup(
              target.dataset.for,
              target.dataset.from,
              e.clientX, e.clientY,
              window.innerWidth - e.clientX, window.innerHeight - e.clientY))
          case 'closeall':
            return this.props.store.dispatch(closeAllPopups())
        }

        return
      }
      target = target.parentNode
    } while (target != null)
    this.props.store.dispatch(closeAllPopups())
  }

  componentWillMount() {
    if (!isServer) {
      this.props.establishCurrentUser()
    }
  }

  render() {
    console.log(`App.render`)
    return (
      <div style={{ height: '100%' }} onClick={this.handleClick}>
        <div className={'content__out' + (this.state.isOpen ? ' content__out_shifted' : '')}>
          <Header
            sidebar={this.state.isOpen}
            mobile={this.state.mobile}
            isAuthenticated={this.props.isAuthenticated}
            current={this.props.location.pathname}
          />
          <div className='core-layout__viewport'>
            <Routes />
          </div>
        </div>
        <div className={'sidebar' + (!this.state.isOpen ? ' sidebar--open' : '')}>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ establishCurrentUser }, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
