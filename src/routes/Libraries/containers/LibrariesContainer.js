import { connect } from 'react-redux'

import { getLibraries } from '../modules/libraries'
import Libraries from '../components/Libraries'

const mapDispatchToProps = {
  getLibraries,
}

const mapStateToProps = (state) => ({
  fetching: state.libraries.fetching,
  libraries: state.libraries.libraries || [],
  addLibraryPopup: state.popups.addLibraryPopup,
  moreLibrariesPopup: state.popups.moreLibrariesPopup
})

export default connect(mapStateToProps, mapDispatchToProps)(Libraries)
