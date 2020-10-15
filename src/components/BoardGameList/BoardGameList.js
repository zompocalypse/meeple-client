import React, { Component } from 'react';
import BoardGame from '../BoardGame/BoardGame';

export default class BoardGameList extends Component {
  static defaultProps = {
    boardGameList: [],
  };

  state = {};

  render() {
    const { boardGameList, handleAddToCollection } = this.props;
    return boardGameList.map((game) => (
      <BoardGame
        key={game.id}
        game={game}
        handleAddToCollection={handleAddToCollection}
      />
    ));
  }
}
