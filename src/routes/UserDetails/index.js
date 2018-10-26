export default (store, history) => ({
  path: '/users/:username',
  name: 'userDetails',
  modules: ['userDetails'],
  getComponent() {
    return Promise.all([
      import(/* webpackChunkName: "userDetails" */ './containers/UserDetailsContainer'),
      import(/* webpackChunkName: "userDetails" */ './modules/userDetails'),
    ])
  }
})
