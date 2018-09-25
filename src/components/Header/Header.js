import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Link } from 'react-router-dom'

import './Header.css'

import Auth from '../Auth'

export class Header extends React.Component {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
    sidebar: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {
    console.log('Header.render')
    return (
      <nav className='container navbar navbar-light bg-faded navbar-header navbar-expand'>
        <div className={'navbar-collapse' + (this.props.mobile ? ' navbar-header-mobile' : '')}>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <NavLink to='/' className='navbar-brand nav-link' activeclassname='route--active'>
                <span className='fa fa-cloud' />
                <span className='navbar__link-label d-none d-sm-inline'>Cloudpolis</span>
                <span className='navbar__link-label d-sm-none'>Home</span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <Link to='/music/libraries' className='nav-link' activeclassname='route--active'>
                <span className='fa fa-book' />
                <span className='navbar__link-label'>Libraries</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/music/artists' className='nav-link' activeclassname='route--active'>
                <span className='fa fa-music' />
                <span className='navbar__link-label'>Artists</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/music/playlists' className='nav-link' activeclassname='route--active'>
                <span className='fa fa-star' />
                <span className='navbar__link-label'>Playlists</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/music/search' className='nav-link' activeclassname='route--active'>
                <span className='fa fa-search' />
                <span className='navbar__link-label'>Search</span>
              </Link>
            </li>
          </ul>
          <Auth />
        </div>
      </nav>
    )
  }
}

export default Header
