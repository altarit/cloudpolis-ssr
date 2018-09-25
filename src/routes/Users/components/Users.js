import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Page from '../../../components/page/index'

export class Users extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object),

    getUsers: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    this.props.getUsers()
  }

  render() {
    return (
      <Page className='container'>
        <h2>Users:</h2>
        <ul className='list-group'>
          {this.props.users.map(user => (
            <li key={user.username} className='list-group-item'>
              <Link to={`/users/${user.username}`}>{user.username}</Link>
            </li>
          ))}
        </ul>
      </Page>
    )
  }
}

export default Users
