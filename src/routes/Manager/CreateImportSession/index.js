export default (store, history) => ({
  path: '/manager/libraries/:libraryName/import',
  name: 'createImportSession',
  modules: ['createImportSession'],
  getComponent() {
    return Promise.all([
      import(/* webpackChunkName: "createImportSession" */ './containers/CreateImportSessionContainer'),
      import(/* webpackChunkName: "createImportSession" */ './modules/createImportSession'),
    ])
  }
})
