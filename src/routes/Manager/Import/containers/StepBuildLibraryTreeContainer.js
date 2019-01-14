import { connect } from 'react-redux'

import { getTree, confirmTree, cancelSession } from '../modules/stepBuildLibraryTree'
import StepBuildLibraryTree from '../components/StepBuildLibraryTree'

const mapDispatchToProps = {
  getTree,
  confirmTree,
  cancelSession,
}

const mapStateToProps = (state, props) => ({
  fetching: state.import.fetching,
  fileTree: state.import.fileTree,
})

export default connect(mapStateToProps, mapDispatchToProps)(StepBuildLibraryTree)
