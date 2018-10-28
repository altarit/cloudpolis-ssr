import { injectReducer } from '../../modules'

export default (store, history) => ({
  path: '/music/libraries',
  name: 'libraries',
  modules: ['libraries'],
  getComponent() {
    console.log('...loading libraries')
    return Promise.all([
      import(/* webpackChunkName: "libraries" */ './containers/LibrariesContainer'),
      import(/* webpackChunkName: "libraries" */ './modules/libraries'),
    ])
      .then(modules => {
        console.log('...loaded libraries', store, history)
        injectReducer(store, history, { key: 'libraries', reducer: modules[1].default })
        console.log('...injected libraries reducer')
        return [modules[0]]
      })
  }
})
