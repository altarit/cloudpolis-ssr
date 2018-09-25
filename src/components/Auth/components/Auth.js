import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import AuthForm from './AuthForm'
import './Auth.css'

export class Auth extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    fetching: PropTypes.bool,
    errorText: PropTypes.string,
    mobile: PropTypes.bool,

    loginPopup: PropTypes.object,
    signupPopup: PropTypes.object,
    userPopup: PropTypes.object,
    signPopup: PropTypes.object,

    resetStatus: PropTypes.func.isRequired,
    hi: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.hi()
  }

  login = (form) => {
    this.props.login(form.username.value, form.password.value)
  }

  signup = (form) => {
    this.props.signup(form.username.value, form.password.value, form.email.value)
  }

  render() {
    let errorText = this.props.errorText
    return (
      <div className='login dropdown open'>
        {this.props.mobile ? (
          <div>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                {this.props.name ? (
                  <a data-click='dropdown' data-for='userPopup' className='nav-link'>
                    <span className='fa fa-user' />
                    <span className='navbar__link-label'>Profile</span>
                  </a>
                ) : (
                  <a data-click='dropdown' data-for='signPopup' className='nav-link'>
                    <span className='fa fa-sign-in' />
                    <span className='navbar__link-label'>Sign&nbsp;In</span>
                  </a>
                )}
              </li>
            </ul>
            {this.props.signPopup ? (
              <ul className='dropdown-menu show' data-click='none'>
                <li className='option'><span data-click='dropdown' data-for='loginPopup'> Login</span></li>
                <li className='option'><span data-click='dropdown' data-for='signupPopup'> Signup</span></li>
              </ul>
            ) : null}
          </div>
        ) : (
          this.props.name ? (
            <button className='btn btn-outline-secondary login__username-btn mr-2'
                    data-click='dropdown' data-for='userPopup'>
              {this.props.name}
            </button>
          ) : (
            <div>
              <button className='btn btn-outline-secondary mr-2' data-click='dropdown' data-for='loginPopup'>
                Login
              </button>
              <button className='btn btn-outline-secondary' data-click='dropdown' data-for='signupPopup'>
                Signup
              </button>
            </div>
          )
        )}

        {this.props.loginPopup ? (
          <div className='dropdown-menu show' data-click='none'>
            <AuthForm onSubmit={this.login} resetStatus={this.props.resetStatus} errorText={errorText} />
          </div>) : null}
        {this.props.signupPopup ? (
          <div className='dropdown-menu show' data-click='none'>
            <AuthForm onSubmit={this.signup} resetStatus={this.props.resetStatus} isreg errorText={errorText} />
          </div>) : null}
        {this.props.userPopup ? (
          <ul className='dropdown-menu show' data-click='none'>
            <li className='option'><a to={`/users/${this.props.name}`}> Profile</a></li>
            <li className='option'><Link to='/users'> Users</Link></li>
            <li className='option'><Link to='/admin'> Admin</Link></li>
            <li className='option'><a className='link' onClick={this.props.logout}> Logout</a></li>
          </ul>
        ) : null}
      </div>
    )
  }
}

export default Auth
