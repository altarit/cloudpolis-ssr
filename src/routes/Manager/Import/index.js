export default (store, history) => ({
  path: '/manager/imports/:importSessionId',
  name: 'import',
  modules: ['import'],
  getComponent() {
    return Promise.all([
      import(/* webpackChunkName: "import" */ './containers/ImportContainer'),
      import(/* webpackChunkName: "import" */ './modules/import'),
    ])
  }
})
