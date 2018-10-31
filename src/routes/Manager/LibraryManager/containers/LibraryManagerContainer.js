import { connect } from 'react-redux'

import { getCompilations, getImportSessions, deleteImport, prepareImport } from '../modules/libraryManager'
import LibraryManager from '../components/LibraryManager'

const mapDispatchToProps = {
  getCompilations,
  getImportSessions,
  deleteImport,
  prepareImport,
}

const mapStateToProps = (state, props) => ({
  libraryName: props.match.params.libraryName,
  fetching: state.libraryManager.fetching,
  compilations: state.libraryManager.compilations,
  importSessions: state.libraryManager.importSessions,
  importTracks: state.popups.importTracks,
  moreImportsPopup: state.popups.moreImportsPopup,
})

export default connect(mapStateToProps, mapDispatchToProps)(LibraryManager)
