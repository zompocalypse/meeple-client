import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import Header from '../Header/Header'
import LoginPage from '../../routes/LoginPage'
import RegisterPage from '../../routes/RegisterPage'
import CollectionPage from '../../routes/CollectionPage'
import LandingPage from '../../routes/LandingPage'

import CollectionContext from '../../contexts/CollectionContext'

import './App.css'

export default class App extends Component {
  static contextType = CollectionContext

  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render(){
    return (
      <div className='App'>
        <header className='App_header'>
          <Header />
        </header>
        <main>
          <Switch>
            <Route
            exact
            path={'/'}
            component={LandingPage}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginPage}
            />
            <PublicOnlyRoute
            path={'/register'}
            component={RegisterPage}
            />
            <PrivateRoute
            path={'/:collection_path'}
            component={CollectionPage}
            />
          </Switch>
        </main>
      </div>
  );
  }
  
}