import { connect } from 'react-redux'

import { getDirContent } from '../modules/fileManager'

import FileManager from '../components/FileManager'

const mapDispatchToProps = owner => ({
  onChange: getDirContent(owner)
})

const mapStateToProps = owner => (state) => {
  const ownerState = state.fileManager[owner] || {

  }
  return {
    owner: owner,
    files: ownerState.files,
    path: ownerState.path,
    drives: ownerState.drives,
  }
}

export default owner => connect(mapStateToProps(owner), mapDispatchToProps(owner))(FileManager)
