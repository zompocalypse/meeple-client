import React from 'react';
import ReactDOM from 'react-dom';
import NewGamePage from './NewGamePage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewGamePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
