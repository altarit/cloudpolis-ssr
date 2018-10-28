import { connect } from 'react-redux'

import { checkProgress, saveTracks, startProcessingMetadata } from '../modules/stepMakeProgress'
import StepMakeProgress from '../components/StepMakeProgress'

const mapDispatchToProps = {
  checkProgress,
  saveTracks,
  startProcessingMetadata,
}

const mapStateToProps = (state, props) => ({
  fetching: state.import.fetching,
  tracks: state.import.tracks,
  albums: state.import.albums,
  compilations: state.import.compilations,
  tracksCompleted: state.import.tracksCompleted,
})

export default connect(mapStateToProps, mapDispatchToProps)(StepMakeProgress)
