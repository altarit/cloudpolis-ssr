import { connect } from 'react-redux'

import { cancelStep, getImportSession } from '../modules/import'
import Import from '../components/Import'

const mapDispatchToProps = {
  cancelStep,
  getImportSession,
}

const mapStateToProps = (state, props) => ({
  importSessionId: props.match.params.importSessionId,
  importPath: state.import.session.importPath,
  networkPath: state.import.session.networkPath,
  libraryName: state.import.session.library,
  status: state.import.session.status,
})

export default connect(mapStateToProps, mapDispatchToProps)(Import)
