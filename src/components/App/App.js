import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import Header from '../Header/Header';
import LoginPage from '../../routes/LoginPage';
import RegisterPage from '../../routes/RegisterPage';
import CollectionPage from '../../routes/CollectionPage/CollectionPage';
import BoardGameList from '../../routes/BoardGamePage/BoardGamePage';
import CollectionItemDetailView from '../../routes/CollectionItemDetailView/CollectionItemDetailView';
import NewGamePage from '../../routes/NewGamePage/NewGamePage';
import LandingPage from '../../routes/LandingPage';

import './App.css';

export default class App extends Component {
  state = { hasError: false };

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App_header">
            <Header />
          </header>
          <main>
            <Switch>
              <Route exact path={'/'} component={LandingPage} />
              <PublicOnlyRoute path={'/login'} component={LoginPage} />
              <PublicOnlyRoute path={'/register'} component={RegisterPage} />
              <PrivateRoute
                exact
                path={'/:collection_path'}
                component={CollectionPage}
              />
              <PrivateRoute
                exact
                path={'/:collection_path/add-to-collection'}
                component={BoardGameList}
              />
              <PrivateRoute
                exact
                path={'/:collection_path/add-to-collection/create-new'}
                component={NewGamePage}
              />
              <PrivateRoute
                exact
                path={'/:collection_path/:collection_id'}
                component={CollectionItemDetailView}
              />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}
