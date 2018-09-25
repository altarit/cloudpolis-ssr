import React from 'react'
import PropTypes from 'prop-types'

import './SideBarTabs.css'

export class SideBarTabs extends React.Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
    openTab: PropTypes.string.isRequired,
    currentTab: PropTypes.string.isRequired,
    scrolledTabs: PropTypes.number.isRequired,
    popups: PropTypes.object.isRequired,

    selectTab: PropTypes.func.isRequired,
    scrollLeft: PropTypes.func.isRequired,
    scrollRight: PropTypes.func.isRequired,
    closePlaylist: PropTypes.func.isRequired,
    createPlaylist: PropTypes.func.isRequired,
  }

  createPlaylist = () => {
    this.props.createPlaylist('New playlist')
  }

  getTabs = () => {
    return this.props.tabs.map(pl => (
      <li key={pl.name} className='nav-item option' onClick={e => {
        this.props.selectTab(pl.name)
      }}>
        <a
          className={'playmenu__tab nav-link' +
          (this.props.openTab === pl.name ? ' active' : '') +
          (this.props.currentTab === pl.name ? ' current' : '')}
          draggable='true'
          onDoubleClick={() => this.props.closePlaylist(pl.name)}
        >
          {pl.name}
        </a>
      </li>
    ))
  }

  scrollRight = () => {
    if (this.props.tabs.length - this.props.scrolledTabs >= 2) {
      this.props.scrollRight()
    }
  }

  scrollLeft = () => {
    if (this.props.scrolledTabs > 0) {
      this.props.scrollLeft()
    }
  }

  render() {
    return (
      <div className='playmenu__tabs dropdown'>
        <button
          className='btn btn-def fa fa-chevron-left playmenu__tabs-control'
          onClick={this.scrollLeft}
        />

        <div className='playmenu__tabs-center'>
          <ul className='nav nav-tabs playmenu__tabs-list'
              style={{ marginLeft: -this.props.scrolledTabs * 70 }}
              data-click='none'>
            {this.getTabs()}

            <li key={'__create'} className='nav-item option' onClick={this.createPlaylist}>
              <a className='playmenu__tab nav-link playmenu__tab_short fa fa-plus'></a>
            </li>
          </ul>
        </div>

        <button
          type='button'
          className='btn fa btn-def fa-chevron-right playmenu__tabs-control'
          onClick={this.scrollRight}
        />
        <button
          type='button'
          className='btn btn-def fa fa-list playmenu__tabs-control'
          data-click='dropdown'
          data-for='allPlaylists'
        />

        <div className='dropdown playmenu__tabs-dropdown'>
          {this.props.popups.allPlaylists ? (
            <ul className='dropdown-menu show'>
              {this.getTabs()}
            </ul>) : ''}
        </div>
      </div>
    )
  }
}

export default SideBarTabs
