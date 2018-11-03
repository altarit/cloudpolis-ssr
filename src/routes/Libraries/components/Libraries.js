import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Page from '../../../components/page/index'
import './Libraries.css'

export class Libraries extends React.Component {
  static propTypes = {
    libraries: PropTypes.arrayOf(PropTypes.object).isRequired,
    getLibraries: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getLibraries()
  }

  render() {
    const {libraries} = this.props

    return (
      <Page className='libraries container'>
        <h2>Libraries</h2>
        <ul className='libraries-list list-group'>
          {libraries.map(el =>
            <li key={el.name}
                className='list-group-item list-group-item-action
                           flex-row align-items-center d-flex h-100 justify-content-between'>
              <Link to={`/music/libraries/${el.name}`} className='list-group-item-action'>
                {el.name}
              </Link>
            </li>
          )}
        </ul>
      </Page>
    )
  }
}

export default Libraries
