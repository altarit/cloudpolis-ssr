import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Page from '../../../components/page/index'

export class CRM extends React.Component {
  static propTypes = {
    name: PropTypes.string
  }

  render() {
    return (
      <Page className='container'>
        <h2>CRM: {this.props.name}</h2>
        <div>
          123
        </div>
      </Page>
    )
  }
}

export default CRM
