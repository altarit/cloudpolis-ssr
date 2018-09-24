import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from '../components/authenticated-route/index'
import UnauthenticatedRoute from '../components/unauthenticated-route/index'
import Loadable from 'react-loadable'

import NotFound from './not-found/index'

const Homepage = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ './homepage/index'),
  loading: () => null,
  modules: ['homepage']
})

const About = Loadable({
  loader: () => import(/* webpackChunkName: "about" */ './about/index'),
  loading: () => null,
  modules: ['about']
})

const Dashboard = Loadable({
  loader: () => import(/* webpackChunkName: "dashboard" */ './dashboard/index'),
  loading: () => null,
  modules: ['dashboard']
})

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ './login/index'),
  loading: () => null,
  modules: ['login']
})

const Logout = Loadable({
  loader: () => import(/* webpackChunkName: "logout" */ './logout/index'),
  loading: () => null,
  modules: ['logout']
})

const Profile = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ './profile/index'),
  loading: () => null,
  modules: ['profile']
})

export default () => (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/about" component={About} />

    <Route exact path="/profile/:id" component={Profile} />

    <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />

    <UnauthenticatedRoute exact path="/login" component={Login} />
    <AuthenticatedRoute exact path="/logout" component={Logout} />

    <Route component={NotFound} />
  </Switch>
)
