export default (store, history) => ({
  path: '/manager/libraries/:libraryName',
  name: 'libraryManager',
  modules: ['libraryManager'],
  getComponent() {
    return Promise.all([
      import(/* webpackChunkName: "libraryManager" */ './containers/LibraryManagerContainer'),
      import(/* webpackChunkName: "libraryManager" */ './modules/libraryManager'),
    ])
  }
})
