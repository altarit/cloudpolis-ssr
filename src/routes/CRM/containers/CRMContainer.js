import { connect } from 'react-redux'

import CRM from '../components/CRM'

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({
  name: state.auth.name
})

export default connect(mapStateToProps, mapDispatchToProps)(CRM)
