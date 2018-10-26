import { connect } from 'react-redux'

import { setImportPath, changeNetworkPath, checkAvailability, prepareImportSession } from '../modules/createImportSession'
import CreateImportSession from '../components/CreateImportSession'

const mapDispatchToProps = {
  setImportPath,
  changeNetworkPath,
  checkAvailability,
  prepareImportSession,
}

const mapStateToProps = (state, props) => ({
  libraryName: props.match.params.libraryName,
  importPath: state.createImportSession.importPath,
  networkPath: state.createImportSession.networkPath,
  isCreationAvailable: state.createImportSession.isCreationAvailable,
  isReadingAvailable: state.createImportSession.isReadingAvailable,
  checkedFiles: state.createImportSession.checkedFiles,
  fileManagerPopup: state.popups.importFileManager,
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateImportSession)
