import React, { Component } from 'react'
import { func, arrayOf, string, object, bool, number } from 'prop-types'

import './StepBuildLibraryTree.css'
import { TYPE_ICONS } from './constants'

export class StepBuildLibraryTree extends Component {
  static propTypes = {
    fileTree: object.isRequired,
    libraryName: string.isRequired,
    importPath: string.isRequired,
    networkPath: string.isRequired,

    getTree: func.isRequired,
    confirmTree: func.isRequired,
  }

  handleBuildTree = () => {
    const { libraryName, importPath, networkPath, importSessionId } = this.props

    this.props.getTree(libraryName, importPath, networkPath, importSessionId)
  }

  handleConfirmTree = () => {
    const { importSessionId } = this.props

    this.props.confirmTree(importSessionId)
  }

  handleCancelSession = () => {
    const { importSessionId } = this.props
  }

  renderFirstLevel = (fileTree) => {
    if (!fileTree) {
      return <div>There's no tree</div>
    }

    const { children, tracks, type } = fileTree

    if (!fileTree.children) {
      return <div>There's no children</div>
    }

    const secondLevelNodes = children && children.map(this.renderNextLevel)
    const rootTracks = tracks && tracks.map(this.renderTrack)
    const iconClass = TYPE_ICONS[type]

    return <div className='StepBuildLibraryTree__dir'>
      <div className='StepBuildLibraryTree__dir-header'>
        <span className={iconClass}> </span>
        Root
      </div>
      <div className='StepBuildLibraryTree__dir-children'>{secondLevelNodes}</div>
      <div className='StepBuildLibraryTree__dir-children'>{rootTracks}</div>
    </div>
  }

  renderNextLevel = (dir) => {
    const { name, children, tracks, type } = dir
    const nextLevelNodes = children && children.map(this.renderNextLevel)
    const thisLevelTracks = tracks && tracks.map(this.renderTrack)
    const iconClass = TYPE_ICONS[type]

    return <div key={name} className='StepBuildLibraryTree__dir'>
      <div className='StepBuildLibraryTree__dir-header'>
        <span className={iconClass}> </span>
        {name}
      </div>
      {nextLevelNodes && nextLevelNodes.length ? (
        <div className='StepBuildLibraryTree__dir-children'>
          {nextLevelNodes}
        </div>
      ) : null}
      {thisLevelTracks && thisLevelTracks.length ? (
        <div className='StepBuildLibraryTree__dir-tracks'>
          {thisLevelTracks}
        </div>
      ) : null}
    </div>
  }


  renderTrack = (track) => {
    const { name, type, path } = track
    const iconClass = TYPE_ICONS[type]

    return <div key={name} className='StepBuildLibraryTree__track'>
      <span className={iconClass}> </span>
      {name}
    </div>
  }

  render () {
    const { fileTree } = this.props

    return (
      <div>
        <h4>Step 2: Search for files</h4>
        <div className='StepBuildLibraryTree__controls btn-group card-body'>
          <button className='btn btn-outline-secondary' onClick={this.handleBuildTree}>
            Build Tree
          </button>
          <button className='btn btn-outline-secondary' onClick={this.handleConfirmTree}>
            Next
          </button>
          <button className='btn btn-outline-secondary' onClick={this.handleCancelSession}>
            Cancel Session
          </button>
        </div>
        {fileTree ? this.renderFirstLevel(fileTree) : null}
      </div>
    )
  }
}

export default StepBuildLibraryTree
