import { injectReducer } from '../../modules'

export default (store, history) => ({
  path: '/music/libraries',
  name: 'libraries',
  getComponent() {
    console.log('...loading libraries')
    return Promise.all([
      import('./containers/LibrariesContainer'),
      import('./modules/libraries'),
      import('./modules/librariesManager'),
    ])
      .then(modules => {
        console.log('...loaded libraries', store, history)
        injectReducer(store, history, { key: 'libraries', reducer: modules[1].default })
        console.log('...injected libraries reducer')
        injectReducer(store, history, { key: 'librariesManager', reducer: modules[2].default })
        console.log('...injected librariesManager reducer')
        return [modules[0]]
      })
  }
})
