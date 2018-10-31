import { connect } from 'react-redux'

import {
  getLibraries,
  createLibrary,
  deleteLibrary,
  deleteAllMusic,
  reImportAllSessions,
} from '../modules/manager'
import Manager from '../components/Manager'

const mapDispatchToProps = {
  getLibraries,
  createLibrary,
  deleteLibrary,
  deleteAllMusic,
  reImportAllSessions,
}

const mapStateToProps = (state) => ({
  name: state.auth.name,

  libraries: state.manager.libraries,
  addLibraryPopup: state.popups.addLibraryPopup,
  moreLibrariesPopup: state.popups.moreLibrariesPopup
})

export default connect(mapStateToProps, mapDispatchToProps)(Manager)
