import React from 'react'
import { func, arrayOf, string, object, bool, number, date } from 'prop-types'

import Page from '../../../../components/page/index'
import './Import.css'
import StepBuildLibraryTree from '../containers/StepBuildLibraryTreeContainer'
import StepMakeProgress from '../containers/StepMakeProgressContainer'

const STATUS_COMPONENTS = {
  'INITIALIZED': StepBuildLibraryTree,
  'READY_TO_PROCESS_METADATA': StepMakeProgress,
  'PROCESSING_METADATA': StepMakeProgress,
}

export class Import extends React.Component {
  static propTypes = {
    importSessionId: string.isRequired,
    importPath: string,
    networkPath: string,
    libraryName: string,
    status: string,
    created: string,

    getImportSession: func.isRequired,
  }

  componentDidMount () {
    const { importSessionId } = this.props

    this.props.getImportSession(importSessionId)
  }

  cancelStep = () => {
    const { step, cancelStep } = this.props

    if (step > 1) {
      cancelStep(step)
    }
  }

  render () {
    const { importPath, networkPath, libraryName, status, created, importSessionId } = this.props
    const StatusComponent = STATUS_COMPONENTS[status]

    return (
      <Page className='Import container'>
        <h2>Library: {libraryName}</h2>

        <div className='Import__card card'>
          <div className='card-body'>
            <h6 className='card-subtitle mb-2 text-muted'>{importSessionId}</h6>
            <h6 className='card-subtitle mb-2 text-muted'>{created}</h6>
            <h5 className='card-title'>{status}</h5>
            <h6 className='card-subtitle mb-2 text-muted'>Import Path: {importPath}</h6>
            <h6 className='card-subtitle mb-2 text-muted'>Network Path: {networkPath}</h6>
          </div>
        </div>

        {status ? (
          <StatusComponent
            importSessionId={importSessionId}
            libraryName={libraryName}
            importPath={importPath}
            networkPath={networkPath}
            status={status}
          />
        ) : null}
      </Page>
    )
  }
}

export default Import
