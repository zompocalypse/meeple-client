import React, { Component } from 'react';
import { Button } from '../Utils/Utils';

export default class BoardGame extends Component {
  static defaultProps = {
    game: {},
  };

  render() {
    const { game } = this.props;
    return (
      <li>
        <Button
          className="plus"
          onClick={() => this.props.handleAddToCollection(game.id)}
        >
          +
        </Button>
        {game.title}
      </li>
    );
  }
}
