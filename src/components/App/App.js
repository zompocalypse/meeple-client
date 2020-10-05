import React, { Component } from 'react';
import {Route, Switch } from 'react-router-dom';
import Header from '../Header/Header'

import './App.css'

function App() {
  return (
    <div className='App'>
      <header className='App_header'>
        <Header />
      </header>
    </div>
  );
}

export default App;