import React, { Component } from 'react'
import { string, arrayOf, func, object } from 'prop-types'

import './FileManager.css'

export class FileManager extends Component {
  static propTypes = {
    owner: string.isRequired,
    path: string,
    defaultPath: string,
    files: arrayOf(object),
    drives: arrayOf(object),

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

  selectAdditionalPath = (additionalPath) => {
    this.props.onChange(this.refs.path.value, additionalPath)
  }

  componentDidMount () {
    this.props.onChange(this.props.defaultPath)
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
    const { files, drives, selectedDrive, defaultPath } = this.props

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
          <input
            name='path'
            type='text'
            className='form-control'
            autoComplete='off'
            defaultValue={defaultPath}
            ref='path'
          />
        </form>

        <div onClick={this.openParentDirectory}>Parent</div>
        <div className='filemanager__dirs'>
          {files && files.map(file => (
            <div key={file.name} onClick={() => this.selectAdditionalPath(file.name)}>
              {file.name}
            </div>
          ))}
        </div>

        <div className='filemanager__bottom btn-group'>
          <button
            className='btn btn-outline-secondary mr-2'
            onClick={this.handleSelect}
            data-click='closeall'
          >
            Select this directory
          </button>
        </div>
      </div>
    )
  }
}

export default FileManager
