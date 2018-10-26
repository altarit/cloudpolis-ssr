export default (store, history) => ({
  path: '/users',
  name: 'users',
  modules: ['users'],
  getComponent() {
    return Promise.all([
      import(/* webpackChunkName: "users" */ './containers/UsersContainer'),
      import(/* webpackChunkName: "users" */ './modules/users'),
    ])
  }
})
