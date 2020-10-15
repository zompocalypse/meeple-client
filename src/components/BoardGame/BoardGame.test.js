import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BoardGame from './BoardGame';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <BoardGame />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
