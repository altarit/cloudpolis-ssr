export default (store, history) => ({
  path: '/users',
  name: 'users',
  getComponent() {
    return Promise.all([
      import('./containers/UsersContainer'),
      import('./modules/users'),
    ])
  }
})
