import { injectReducer } from '../../../modules/index'

export default (store, history) => ({
  path: '/manager',
  name: 'manager',
  modules: ['manager'],
  getComponent() {
    console.log('...loading manager')
    return Promise.all([
      import(/* webpackChunkName: "manager" */ './containers/ManagerContainer'),
      import(/* webpackChunkName: "manager" */ './modules/manager'),
      import(/* webpackChunkName: "manager" */ './modules/librariesManager'),
    ])
      .then(modules => {
        console.log('...loaded manager', store, history)
        injectReducer(store, history, { key: 'manager', reducer: modules[1].default })
        console.log('...injected manager reducer')
        injectReducer(store, history, { key: 'librariesManager', reducer: modules[2].default })
        console.log('...injected librariesManager reducer')
        return [modules[0]]
      })
  }
})
