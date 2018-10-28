import React from 'react'
import { func, arrayOf, string, object, bool, number } from 'prop-types'

import Page from '../../../../components/page/index'
import './Import.css'
import StepBuildLibraryTree from "../containers/StepBuildLibraryTreeContainer"
import StepMakeProgress from "../containers/StepMakeProgressContainer"

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
    const { importPath, networkPath, libraryName, status, importSessionId } = this.props
    const StatusComponent = STATUS_COMPONENTS[status] || null

    return (
      <Page className='Import container'>
        <h2>Library: {libraryName}</h2>
        {status ? (
          <div>
            Import path: {importPath} <br />
            Network path: {networkPath} <br />
            Status: {status} <br />

            <StatusComponent
              importSessionId={importSessionId}
              libraryName={libraryName}
              importPath={importPath}
              networkPath={networkPath}
              status={status}
            />
          </div>
        ) : null}
      </Page>
    )
  }
}

export default Import
