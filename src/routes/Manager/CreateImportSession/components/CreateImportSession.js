import React from 'react'
import { func, arrayOf, string, object, bool, number } from 'prop-types'

import Page from '../../../../components/page/index'
import FileManagerCreator from '../../../../components/FileManager/index'

import './CreateImportSession.css'
const FileManager = FileManagerCreator('import')

export class CreateImportSession extends React.Component {
  static propTypes = {
    importPath: string,
    networkPath: string,
    libraryName: string,
    fileManagerPopup: object,
    isCreationAvailable: bool,
    isReadingAvailable: bool,
    checkedFiles: number,

    setImportPath: func.isRequired,
    changeNetworkPath: func.isRequired,
    checkAvailability: func.isRequired,
    prepareImportSession: func.isRequired,
  }

  handleChangeImportPath = (mainPath, secondPath) => {
    this.props.setImportPath(mainPath)
  }

  handleChangeNetworkPath = (e) => {
    const value = e.target.value

    this.props.changeNetworkPath(value)
  }

  checkAvailability = () => {
    const { importPath, networkPath } = this.props

    this.props.checkAvailability(importPath, networkPath)
  }

  handleConfirmMountParameters = () => {
    const { libraryName, importPath, networkPath } = this.props

    this.props.prepareImportSession(libraryName, importPath, networkPath)
  }

  render () {
    const {
      fileManagerPopup, libraryName, importPath, networkPath, isReadingAvailable, isCreationAvailable
    } = this.props

    return (
      <Page className='Import container'>
        <h2>Library: {libraryName}</h2>

        <h4>Step 1: Add mount point</h4>
        <div className=''>
          <label>Root directory</label>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              autoComplete='off'
              value={importPath}
              disabled
            />
            <div className='input-group-append'>
              <button
                className='btn btn-outline-secondary'
                type='button'
                data-for='importFileManager'
                data-click='dropdown'
              >
                Choose directory
              </button>
            </div>
          </div>
          <small className='form-text text-muted'>
            Root path to the directory where is music is stored.
          </small>
          <br />

          <label>Network mapping</label>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              autoComplete='off'
              defaultValue={networkPath}
              onChange={this.handleChangeNetworkPath}
            />
            <div className='input-group-append'>
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={this.checkAvailability}
              >
                Check availability
              </button>
            </div>
          </div>
          <small className='form-text text-muted'>
            Network path that provides files from the root directory above.
          </small>
          <br />

          <div>
            <div>Reading available: {'' + isReadingAvailable}</div>
            <div>Creation available: {'' + isCreationAvailable}</div>
          </div>

          <button
            className='btn btn-outline-secondary'
            disabled={!isReadingAvailable || !isCreationAvailable}
            onClick={this.handleConfirmMountParameters}>
            Confirm
          </button>
        </div>
        {fileManagerPopup ? (
          <div className='show dropdown_fixed'
               style={{
                 top: fileManagerPopup.y + 30,
                 left: fileManagerPopup.rx - 300,
               }}>
            <FileManager onSubmit={this.handleChangeImportPath} defaultPath={importPath} />
          </div>
        ) : null}
      </Page>
    )
  }
}

export default CreateImportSession
