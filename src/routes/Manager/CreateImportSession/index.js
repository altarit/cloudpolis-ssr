export default (store, history) => ({
  path: '/manager/libraries/:libraryName/import',
  name: 'createImportSession',
  modules: ['createImportSession'],
  getComponent() {
    return Promise.all([
      import(/* webpackChunkName: "import" */ './containers/CreateImportSessionContainer'),
      import(/* webpackChunkName: "import" */ './modules/createImportSession'),
    ])
  }
})
