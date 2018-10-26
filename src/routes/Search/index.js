export default (store, history) => ({
  path: '/music/search',
  name: 'search',
  modules: ['search'],
  getComponent() {
    return Promise.all([
      import(/* webpackChunkName: "search" */ './containers/SearchContainer'),
      import(/* webpackChunkName: "search" */ './modules/search'),
    ])
  }
})
