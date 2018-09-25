import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

import NotFound from './not-found/index'
import AuthenticatedRoute from '../components/authenticated-route/index'
import UnauthenticatedRoute from '../components/unauthenticated-route/index'
import { injectReducer } from '../modules'

import Home from './Home'
import Artists from './Artists'
import Artist from './Artist'
import Search from './Search'
import Admin from './Admin'
import Users from './Users'
import UserDetails from './UserDetails'
import AccessLog from './AccessLog'
import Libraries from './Libraries'
import Library from './Library'
import Playlists from './Playlists'

// const Homepage = Loadable({
//   loader: () => import(/* webpackChunkName: "homepage" */ './Home/containers/HomeContainer'),
//   loading: () => null,
//   modules: ['homepage']
// })
//
// const About = Loadable({
//   loader: () => import(/* webpackChunkName: "about" */ './about/index'),
//   loading: () => null,
//   modules: ['about']
// })
//
// const Dashboard = Loadable({
//   loader: () => import(/* webpackChunkName: "dashboard" */ './dashboard/index'),
//   loading: () => null,
//   modules: ['dashboard']
// })
//
// const Login = Loadable({
//   loader: () => import(/* webpackChunkName: "login" */ './login/index'),
//   loading: () => null,
//   modules: ['login']
// })
//
// const Logout = Loadable({
//   loader: () => import(/* webpackChunkName: "logout" */ './logout/index'),
//   loading: () => null,
//   modules: ['logout']
// })
//
// const Profile = Loadable({
//   loader: () => import(/* webpackChunkName: "profile" */ './profile/index'),
//   loading: () => null,
//   modules: ['profile']
// })

export const createRoutes = (store, history) => [
  Home,
  Artists,
  Artist,
  Search(store, history),
  Admin(store, history),
  Users(store, history),
  UserDetails(store, history),
  AccessLog(store, history),
  Libraries(store, history),
  Library(store, history),
  Playlists(store, history),
].map(component => createLoadableComponent(component, store, history))

function createLoadableComponent(lazyComponent, store, history) {
  if (lazyComponent.component) {
    return <Route key={lazyComponent.path} exact path={lazyComponent.path} component={lazyComponent.component} />
  }

  const loadable = Loadable({
    loader: () => {
      return lazyComponent.getComponent()
        .then(modules => {
          if (modules[1]) {
            injectReducer(store, history, { key: lazyComponent.name, reducer: modules[1].default })
          }
          return modules[0]
        })
    },
    loading() {
      return <div>Loading...</div>
    },
    modules: [lazyComponent.name]
  })

  return (
    <Route key={lazyComponent.path} exact path={lazyComponent.path} component={loadable} />
  )
}

export default (store, history) => (
  <Switch>
    {createRoutes(store, history)}
  </Switch>
)

/*
    <Route exact path="/about" component={About} />

    <Route exact path="/profile/:id" component={Profile} />

    <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />

    <UnauthenticatedRoute exact path="/login" component={Login} />
    <AuthenticatedRoute exact path="/logout" component={Logout} />

    <Route component={NotFound} />
 */
