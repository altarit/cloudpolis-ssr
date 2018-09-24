import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './Track.css'
import {trackLink} from '../../../modules/formatUtils'

export class Track extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    library: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    // compilation: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    href: PropTypes.string,
    // duration: PropTypes.string.isRequired,

    isPlaying: PropTypes.bool.isRequired,
    isCurrent: PropTypes.bool.isRequired,
    pos: PropTypes.number.isRequired,
    immutable: PropTypes.bool.isRequired,
    currentTab: PropTypes.string.isRequired,
    openTab: PropTypes.string.isRequired,
    pl: PropTypes.string,
    isDragOver: PropTypes.bool,

    trackAdd: PropTypes.object,

    pause: PropTypes.func.isRequired,
    playSong: PropTypes.func.isRequired,
    updatePlaylist: PropTypes.func,
    moveTrack: PropTypes.func.isRequired,
    openPopup: PropTypes.func.isRequired,
    removeTrack: PropTypes.func.isRequired,
    addToPlaylist: PropTypes.func.isRequired,
    trackDragStart: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isAbove: null
    }
  }

  handlePlayButton = () => {
    if (this.props.isCurrent && this.props.isPlaying) {
      this.props.pause()
    } else {
      this.props.playSong(this.props)
      if (this.props.updatePlaylist) {
        this.props.updatePlaylist()
      }
    }
  }

  dragStart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(`dragStart`)

    this.props.trackDragStart({
      pos: this.props.pos,
      pl: this.props.pl,
      track: this.props
    }, !this.props.immutable)
  }

  openMenu = (e) => {
    this.props.openPopup('trackAdd', `${this.props.pl}:${this.props.pos}:${!this.props.immutable}`)
  }

  getFullLink = () => {
    return trackLink(this.props.src)
  }

  removeTrack = () => {
    this.props.removeTrack(this.props.pl, this.props.pos)
  }

  playNext = () => {
    this.props.addToPlaylist(this.props, this.props.currentTab, true)
  }

  playLater = () => {
    this.props.addToPlaylist(this.props, this.props.currentTab)
  }

  addToOpenTab = () => {
    this.props.addToPlaylist(this.props, this.props.openTab)
  }

  getDropdownMenu = () => {
    return (
      <ul className='dropdown-menu show track_dropdown'>
        <li className='option'>
          <a onClick={this.playNext}>
            <span className='fa fa-fw fa-mail-forward' />Play next
          </a>
        </li>
        <li className='option'>
          <a onClick={this.playLater}>
            <span className='fa fa-fw fa-hourglass' />Play later
          </a>
        </li>
        <li className='option'>
          <a onClick={this.addToOpenTab}>
            <span className='fa fa-fw fa-plus' />Add to {this.props.openTab}
          </a>
        </li>
        {!this.props.immutable ? (
          <li className='option'>
            <a onClick={this.removeTrack}>
              <span className='fa fa-fw fa-remove' />Remove from {this.props.pl}
            </a>
          </li>
        ) : null}
        {this.props.compilation ? (
          <li className='option'>
            <Link to={`/music/libraries/${this.props.library}/${this.props.compilation}`}>
              <span className='fa fa-fw fa-user' />Go to {this.props.compilation}
            </Link>
          </li>
        ) : null}
        <li className='option'>
          <a href={this.getFullLink()} download>
            <span className='fa fa-fw fa-download' />Download
          </a>
        </li>
      </ul>
    )
  }

  render() {
    let trackPID = `${this.props.pl}:${this.props.pos}:${!this.props.immutable}`

    return (
      <div>
        <div
          className={'track' + (this.props.isCurrent ? ' playing' : '')}
          style={{
            marginTop: this.props.isDragOver ? '40px' : null
          }}
          draggable='true'
          onDragStart={this.dragStart}>

          <div className='track__cover' onClick={this.handlePlayButton}>
            <span className={this.props.isCurrent && this.props.isPlaying ? 'fa fa-pause' : 'fa fa-play'} />
          </div>
          <div className='track__info' onDoubleClick={this.handlePlayButton}>
            <div className='track__title'>{this.props.title}</div>
            <div className='track__artist'>{this.props.artist} [{this.props.library}]</div>
          </div>

          <div className='track__control'>
            <button type='button' className='btn fa fa-ellipsis-h' data-click='nothing' onClick={this.openMenu} />
          </div>
          <div className='track__end'>
            {this.props.duration}
          </div>
        </div>

        <div className='dropdown'>
          {this.props.trackAdd && this.props.trackAdd.from === trackPID ? this.getDropdownMenu() : null }
        </div>
      </div>
    )
  }
}

export default Track
