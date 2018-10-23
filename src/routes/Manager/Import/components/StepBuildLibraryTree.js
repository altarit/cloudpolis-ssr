import React, { Component } from 'react'
import { func, arrayOf, string, object, bool, number } from 'prop-types'

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

    return <div className='Import__dir'>
      <div className='Import__dir-header'>
        <span className={iconClass}> </span>
        Root
      </div>
      <div className='Import__dir-children'>{secondLevelNodes}</div>
      <div className='Import__dir-children'>{rootTracks}</div>
    </div>
  }

  renderNextLevel = (dir) => {
    const { name, children, tracks, type } = dir
    const nextLevelNodes = children && children.map(this.renderNextLevel)
    const thisLevelTracks = tracks && tracks.map(this.renderTrack)
    const iconClass = TYPE_ICONS[type]

    return <div key={name} className='Import__dir'>
      <div className='Import__dir-header'>
        <span className={iconClass}> </span>
        {name}
      </div>
      {nextLevelNodes && nextLevelNodes.length ? (
        <div className='Import__dir-children'>
          {nextLevelNodes}
        </div>
      ) : null}
      {thisLevelTracks && thisLevelTracks.length ? (
        <div className='Import__dir-tracks'>
          {thisLevelTracks}
        </div>
      ) : null}
    </div>
  }


  renderTrack = (track) => {
    const { name, type, path } = track
    const iconClass = TYPE_ICONS[type]

    return <div key={name} className='Import__track'>
      <span className={iconClass}> </span>
      {name}
    </div>
  }

  render () {
    const { fileTree, importPath } = this.props

    return (
      <div>
        <h3>Step 2: Processing directory {importPath}</h3>
        <button onClick={this.handleBuildTree}>Build Tree</button>
        <button onClick={this.handleConfirmTree}>Next</button>
        {fileTree ? this.renderFirstLevel(fileTree) : null}
      </div>
    )
  }
}

export default StepBuildLibraryTree
