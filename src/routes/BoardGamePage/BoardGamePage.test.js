import React from 'react';
import ReactDOM from 'react-dom';
import BoardGamePage from './BoardGamePage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BoardGamePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
