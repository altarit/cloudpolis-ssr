import React from 'react'
import { func, arrayOf, string, object, bool, number } from 'prop-types'
import { Link } from 'react-router-dom'

import Page from '../../../../components/page/index'
import './Manager.css'

export class Manager extends React.Component {
  static propTypes = {
    name: string,
    libraries: arrayOf(object).isRequired,
    // fetching: bool,

    addLibraryPopup: object,
    moreLibrariesPopup: object,
    deleteLibraryDialog: object,

    getLibraries: func.isRequired,
    createLibrary: func.isRequired,
    deleteLibrary: func.isRequired,
  }

  componentDidMount () {
    this.props.getLibraries()
  }

  createLibrary = (values) => {
    this.props.createLibrary(values.name)
  }

  deleteLibrary = () => {
    this.props.deleteLibrary(this.props.moreLibrariesPopup.from)
  }

  static renderLibraryRow (library) {
    const { name, created } = library

    return (
      <tr key={name}>
        <th scope='row'>
          <Link to={`/manager/libraries/${name}`} className='list-group-item-action'>
            {name}
          </Link>
        </th>
        <td>{created}</td>
        <td>0</td>
        <td>0</td>
        <td>
          <button type='button' className='btn btn-def fa'
                  data-for='moreLibrariesPopup' data-click='dropdown' data-from={name}>
            ...
          </button>
        </td>
      </tr>
    )
  }

  render () {
    const { libraries, moreLibrariesPopup } = this.props

    return (
      <Page className='Manager container'>
        <h2>Manager</h2>
        <div className='Manager__controls btn-group card-body'>
          <button className='btn btn-outline-secondary' onClick={this.createLibrary} data-click='custom'>
            Create Library
          </button>
          <button className='btn btn-outline-secondary' onClick={this.props.deleteCollections}>
            Delete Artists
          </button>
          <button className='btn btn-outline-secondary' onClick={this.props.deleteSongs}>
            Delete Songs
          </button>
          <button className='btn btn-outline-secondary' onClick={this.props.extractSongs}>
            Extract Songs
          </button>
        </div>

        <table className='Manager__libraries table '>
          <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Created</th>
            <th scope='col'>Imports</th>
            <th scope='col'>Tracks</th>
            <th scope='col'>More</th>
          </tr>
          </thead>
          <tbody>
          {libraries.map(Manager.renderLibraryRow)}
          </tbody>
        </table>

        <div className='dropdown'>
          {moreLibrariesPopup ? (
            <ul className='dropdown-menu show dropdown_fixed'
                style={{
                  top: moreLibrariesPopup.y - 10,
                  left: moreLibrariesPopup.x - 160,
                }}>
              <li onClick={this.deleteLibrary} data-click='custom'>
                <span className='option fa fa-trash-o'> Delete</span>
              </li>
            </ul>
          ) : null}
        </div>
      </Page>
    )
  }
}

export default Manager
