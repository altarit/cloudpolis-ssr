import React from 'react'
import { func, arrayOf, string, object, bool, number } from 'prop-types'
import { Link } from 'react-router-dom'

import Page from '../../../../components/page/index'
import './LibraryManager.css'

export class LibraryManager extends React.Component {
  static propTypes = {
    importTracks: object,
    libraryName: string,
    // fetching: bool,
    compilations: arrayOf(object).isRequired,
    importSessions: arrayOf(object).isRequired,

    moreImportsPopup: object,

    getImportSessions: func.isRequired,
    getDirContent: func.isRequired,
    deleteImport: func.isRequired,
    prepareImport: func.isRequired,
  }

  componentDidMount () {
    const { libraryName } = this.props

    this.props.getImportSessions(libraryName)
  }

  handleChangePath = (mainPath, secondPath) => {
    this.props.getDirContent(mainPath, secondPath)
  }

  handleSubmitPath = (mainPath, secondPath) => {
    this.props.getDirContent(mainPath, secondPath)
  }

  prepareImport = () => {
    const { libraryName } = this.props

    this.props.prepareImport(libraryName)
  }

  deleteImport = () => {
    const { moreImportsPopup, importSessions } = this.props

    if (moreImportsPopup) {
      const id = moreImportsPopup.from
      const session = importSessions.find(s => s.id === id)

      if (session) {
        this.props.deleteImport(id, session.status)
      }
    }
  }

  static renderImportSessionRow (importSession) {
    const { id, status, importPath, networkPath, created } = importSession

    return (
      <tr key={id}>
        <th scope='row'>
          <Link to={`/manager/imports/${id}`} className='list-group-item-action'>
            {created} <br />{id}
          </Link>
        </th>
        <td>{networkPath} <br />{importPath}</td>
        <td>{status}</td>
        <td>
          <button type='button' className='btn btn-def fa'
                  data-for='moreImportsPopup' data-click='dropdown' data-from={id}>
            ...
          </button>
        </td>
      </tr>
    )
  }

  render () {
    const { libraryName, importSessions, moreImportsPopup } = this.props

    return (
      <Page className='LibraryManager container'>
        <h2>Library: {libraryName}</h2>
        <div className='LibraryManager__controls btn-group card-body'>
          <button className='btn btn-outline-secondary' onClick={this.prepareImport}>
            Import Tracks
          </button>
          <button className='btn btn-outline-secondary' onClick={this.props.deleteSongs}>
            Delete Songs
          </button>
          <button className='btn btn-outline-secondary' onClick={this.props.extractSongs}>
            Extract Songs
          </button>
        </div>

        <table className='LibraryManager__imports table '>
          <thead>
          <tr>
            <th scope='col'>Created / Id</th>
            <th scope='col'>Import Path / Network Path</th>
            <th scope='col'>Status</th>
            <th scope='col'>More</th>
          </tr>
          </thead>
          <tbody>
          {importSessions.map(LibraryManager.renderImportSessionRow)}
          </tbody>
        </table>

        <div className='dropdown'>
          {moreImportsPopup ? (
            <ul className='dropdown-menu show dropdown_fixed'
                style={{
                  top: moreImportsPopup.y - 10,
                  left: moreImportsPopup.x - 160,
                }}>
              <li onClick={this.deleteImport} data-click='custom'>
                <span className='option fa fa-trash-o'> Delete</span>
              </li>
            </ul>
          ) : null}
        </div>
      </Page>
    )
  }
}

export default LibraryManager
