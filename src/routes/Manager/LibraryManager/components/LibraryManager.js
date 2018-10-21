import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Page from '../../../../components/page/index'
import './LibraryManager.css'

export class LibraryManager extends React.Component {
  static propTypes = {
    importTracks: PropTypes.object,

    libraryName: PropTypes.string,
    // fetching: PropTypes.bool,
    compilations: PropTypes.arrayOf(PropTypes.object).isRequired,
    importSessions: PropTypes.arrayOf(PropTypes.object).isRequired,

    getCompilations: PropTypes.func.isRequired,
    getImportSessions: PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.getCompilations(this.props.libraryName)
    this.props.getImportSessions(this.props.libraryName)
  }

  handleChangePath = (mainPath, secondPath) => {
    this.props.getDirContent(mainPath, secondPath)
  }

  handleSubmitPath = (mainPath, secondPath) => {
    this.props.getDirContent(mainPath, secondPath)
  }

  render () {
    return (
      <Page className='libraries container'>
        <h2>Library: {this.props.libraryName}</h2>
        <div className='btn-group card-body'>
          <Link to={`/manager/libraries/${this.props.libraryName}/import`}>Import tracks</Link>
        </div>

        <ul className='libraries-list list-group'>
          {this.props.compilations.map(el =>
            <li key={el.name}
                className='list-group-item list-group-item-action
                           flex-row align-items-center d-flex h-100 justify-content-between'>
              <Link to={`/music/libraries/${this.props.libraryName}/${el.name}`} className='list-group-item-action'>
                {el.name}
              </Link>
              <button type='button' className='btn btn-def fa'
                      data-for='moreCompilationsPopup' data-click='dropdown' data-from={el.name}>
                ...
              </button>
            </li>
          )}
        </ul>
      </Page>
    )
  }
}

export default LibraryManager
