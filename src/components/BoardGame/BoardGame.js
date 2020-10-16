import React, { Component } from 'react';
import { Button } from '../Utils/Utils';

export default class BoardGame extends Component {
  static defaultProps = {
    game: {},
  };

  render() {
    const { game } = this.props;
    return (
      <div>
        <Button
          className="standard add"
          onClick={() => this.props.handleAddToCollection(game.id)}
        >
          Add
        </Button>
        {game.title}
      </div>
    );
  }
}
