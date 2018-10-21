export default (store, history) => ({
  path: '/music/playlists',
  name: 'playlists',
  modules: ['playlists'],
  getComponent() {
    return Promise.all([
      import(/* webpackChunkName: "playlists" */ './containers/PlaylistsContainer'),
      import(/* webpackChunkName: "playlists" */ './modules/playlists'),
    ])
  }
})
