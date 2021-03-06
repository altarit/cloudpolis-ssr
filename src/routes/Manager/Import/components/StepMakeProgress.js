import React, { Component } from 'react'
import { func, arrayOf, string, object, bool, number } from 'prop-types'

import './StepMakeProgress'
import { TYPE_ICONS } from './constants'

export class StepMakeProgress extends Component {
  static propTypes = {
    tracks: arrayOf(object).isRequired,
    tracksCompleted: number.isRequired,
    libraryName: string.isRequired,
    importPath: string.isRequired,

    checkProgress: func.isRequired,
    saveTracks: func.isRequired,
    startProcessingMetadata: func.isRequired,
  }

  renderNormalizedTracks = (tracks) => {
    if (!tracks || !tracks.length) {
      return <div>Processing</div>
    }

    const renderedTracks = tracks.map(this.renderNormalizedTrack)

    return renderedTracks
  }

  renderNormalizedTrack = (track) => {
    const { name, type, path, album, compilation } = track
    const iconClass = TYPE_ICONS['track']

    return <div key={path} className='Import__track'>
      <span className={iconClass}> </span>
      {path} / {compilation} / {compilation}
    </div>
  }

  checkProgress = () => {
    const { importSessionId, libraryName } = this.props

    this.props.checkProgress(importSessionId, libraryName)
  }

  saveTracks = () => {
    this.props.saveTracks(this.props.importSessionId)
  }

  startProcessingMetadata = () => {
    this.props.startProcessingMetadata(this.props.importSessionId)
  }

  render () {
    const { libraryName, importPath, importSessionId, tracks, tracksCompleted } = this.props

    return (
      <div>
        <h4>Step 3: Processing metadata</h4>

        <div className='StepBuildLibraryTree__controls btn-group card-body'>
          <button className='btn btn-outline-secondary' onClick={this.startProcessingMetadata}>
            Start Processing
          </button>
          <button className='btn btn-outline-secondary' onClick={this.checkProgress}>
            Update progress
          </button>
          <button className='btn btn-outline-secondary' onClick={this.saveTracks}>
            Next
          </button>
        </div>
        {tracksCompleted}/ {tracks && tracks.length}
        {this.renderNormalizedTracks(tracks)}
      </div>
    )
  }
}

export default StepMakeProgress
