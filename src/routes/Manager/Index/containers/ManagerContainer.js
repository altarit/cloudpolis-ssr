import { connect } from 'react-redux'

import { getLibraries, createLibrary, deleteLibrary } from '../modules/librariesManager'
import Manager from '../components/Manager'

const mapDispatchToProps = {
  getLibraries,
  createLibrary,
  deleteLibrary,
}

const mapStateToProps = (state) => ({
  name: state.auth.name,

  libraries: state.librariesManager.libraries,
  addLibraryPopup: state.popups.addLibraryPopup,
  moreLibrariesPopup: state.popups.moreLibrariesPopup
})

export default connect(mapStateToProps, mapDispatchToProps)(Manager)
