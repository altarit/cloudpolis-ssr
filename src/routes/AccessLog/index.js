export default (store, history) => ({
  path: '/admin/access',
  name: 'accessLog',
  getComponent() {
    return Promise.all([
      import('./containers/AccessLogContainer'),
      import('./modules/accessLog'),
    ])
  }
})
