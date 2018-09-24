import React from 'react'
import PropTypes from 'prop-types'

class AuthForm extends React.Component {
  static propTypes = {
    isreg: PropTypes.bool,
    errorText: PropTypes.string,

    resetStatus: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  componentWillMount = () => {
    this.props.resetStatus()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(e.target)
  }

  render() {
    return (
      <form className='login-form' onSubmit={this.handleSubmit} method='post'>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input name='username' type='text' className='form-control' />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input name='password' type='password' className='form-control' />
        </div>
        {this.props.isreg ? (
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input name='email' type='email' className='form-control' />
          </div>
        ) : null}
        <div>{this.props.errorText}</div>
        <div className='btn-group'>
          <button type='submit' className='btn btn-outline-secondary mr-2'>Send</button>
        </div>
        <div className='btn-group'>
          <button type='button' className='btn btn-outline-secondary' data-click='closeall'>Cancel</button>
        </div>
      </form>
    )
  }
}

export default AuthForm
