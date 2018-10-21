export default {
  path: '/music/artists',
  name: 'artists',
  modules: ['artists'],
  getComponent () {
    return Promise.all([
      import(/* webpackChunkName: "artists" */ './containers/ArtistsContainer'),
      import(/* webpackChunkName: "artists" */ './modules/artists'),
    ])
  }
}
