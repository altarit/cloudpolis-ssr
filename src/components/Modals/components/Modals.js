import React from 'react'
import PropTypes from 'prop-types'

import './Modals.css'

export class Modals extends React.Component {
  static propTypes = {
    confirmationPopup: PropTypes.object,
    singleInputPopup: PropTypes.object,
    shade: PropTypes.bool,

    dispatch: PropTypes.func.isRequired
  }

  executeConfirmationAction = () => {
    this.props.dispatch(this.props.confirmationPopup.action)
  }

  executeSingleInputAction = (e) => {
    e.preventDefault()
    this.props.dispatch(this.props.singleInputPopup.action(this.refs.singleInput.value))
  }

  render() {
    return (
      <nav className='modals'>
        {this.props.shade ? (
          <div className="modals-shade"></div>
        ) : null}
        {this.props.confirmationPopup ? (
          <div className='dropdown show dropdown-menu modal-confirmation' data-click='none'>
            <div className="modal-text modal-top">
              {this.props.confirmationPopup.title}
            </div>
            <div className="modal-buttons">
              <button type='button' className='btn btn-outline-secondary' data-click='closeall'>
                {this.props.confirmationPopup.rejectText}
              </button>
              <button type='submit' className='btn btn-outline-secondary' data-click='closeall'
                      onClick={this.executeConfirmationAction}>
                {this.props.confirmationPopup.confirmText}
              </button>
            </div>
          </div>
        ) : null}
        {this.props.singleInputPopup ? (
          <div className='dropdown show dropdown-menu modal-confirmation' data-click='none'>

            <form onSubmit={this.executeSingleInputAction}>
              <div className="modal-top">
                <div className="modal-text">
                  {this.props.singleInputPopup.title}
                </div>
                <div className='form-group'>
                  <input name='name' type='text' className='form-control' ref='singleInput' autoComplete='off'
                         defaultValue={this.props.singleInputPopup.defaultValue}/>

                  {this.props.singleInputPopup.errorText}
                </div>
              </div>

              <div className="modal-buttons">
                <button type='button' className='btn btn-outline-secondary' data-click='closeall'>
                  Cancel
                </button>
                <button type='submit' className='btn btn-outline-secondary' data-click='custom'
                        onClick={this.executeSingleInputAction}>
                  {this.props.singleInputPopup.confirmText}
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </nav>
    )
  }
}

export default Modals
