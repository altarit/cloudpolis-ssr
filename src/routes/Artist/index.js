export default {
  path: '/music/libraries/:artistsLibrary/:artistName',
  name: 'artist',
  modules: ['artist_com', 'artist_red'],
  getComponent() {
    return Promise.all([
      import(/* webpackChunkName: "artist_com" */ './containers/ArtistContainer'),
      import(/* webpackChunkName: "artist_red" */ './modules/artist'),
    ])
  }
}
