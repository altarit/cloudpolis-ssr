export default (store, history) => ({
  path: '/admin/access',
  name: 'accessLog',
  modules: ['accessLog'],
  getComponent() {
    return Promise.all([
      import(/* webpackChunkName: "accessLog" */ './containers/AccessLogContainer'),
      import(/* webpackChunkName: "accessLog" */ './modules/accessLog'),
    ])
  }
})
