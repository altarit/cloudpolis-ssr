export default (store, history) => ({
  path: '/admin',
  name: 'admin',
  modules: ['admin'],
  getComponent() {
    return Promise.all([
      import(/* webpackChunkName: "admin" */ './containers/AdminContainer'),
      import(/* webpackChunkName: "admin" */ './modules/admin'),
    ])
  }
})
