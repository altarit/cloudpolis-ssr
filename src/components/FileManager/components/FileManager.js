import React, { Component } from 'react'
import { string, arrayOf, func, object } from 'prop-types'

import './FileManager.css'

export class FileManager extends Component {
  static propTypes = {
    owner: string.isRequired,
    path: string.isRequired,
    files: arrayOf(string).isRequired,
    drives: arrayOf(object).isRequired,

    onChange: func.isRequired,
    onSubmit: func.isRequired,
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const mainPath = this.refs.path.value
    this.props.onChange(mainPath)
  }

  openParentDirectory = () => {
    this.props.onChange(this.refs.path.value, '..')
  }

  selectSecondPath = (secondPath) => {
    this.props.onChange(this.refs.path.value, secondPath)
  }

  componentDidMount () {
    this.props.onChange()
  }

  componentDidUpdate () {
    const path = this.props.path
    this.refs.path.value = path || ''
  }

  handleSelect = () => {
    this.props.onSubmit(this.refs.path.value)
  }

  selectDrive = (e) => {
    const value = e.target.value || ''
    this.refs.path.value = value
    this.props.onChange(value)
  }

  render () {
    const { files, drives, selectedDrive } = this.props

    return (
      <div className='dropdown show dropdown-menu filemanager' data-click='none'>
        Open
        <form className='filemanager__form' onSubmit={this.handleSubmit} method='post'>
          <select onChange={this.selectDrive} className='filemanager__form-diskdrive form-control'>
            <option></option>
            {drives && drives.map(({ mountpoint }) => (
              <option key={mountpoint} value={mountpoint}>{mountpoint}</option>
            ))}
          </select>
          <input name='path' type='text' className='form-control' autoComplete='off' ref='path' />
        </form>

        <div onClick={this.openParentDirectory}>Parent</div>
        <div className='filemanager__dirs'>
          {files && files.map(secondPath => (
            <div key={secondPath} onClick={() => this.selectSecondPath(secondPath)}>
              {secondPath}
            </div>
          ))}
        </div>

        <div className='filemanager__bottom btn-group'>
          <button className='btn btn-outline-secondary mr-2' onClick={this.handleSelect}>Select this directory</button>
        </div>
      </div>
    )
  }
}

export default FileManager
