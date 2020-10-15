import React from 'react';
import ReactDOM from 'react-dom';
import BoardGame from './BoardGame';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BoardGame />, div);
  ReactDOM.unmountComponentAtNode(div);
});
