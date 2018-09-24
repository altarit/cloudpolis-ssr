export default (store, history) => ({
  path: '/music/search',
  name: 'search',
  getComponent() {
    return Promise.all([
      import('./containers/SearchContainer'),
      import('./modules/search'),
    ])
  }
})
