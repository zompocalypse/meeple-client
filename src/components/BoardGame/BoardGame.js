import React, { Component } from 'react';
import { Button } from '../Utils/Utils'

export default class BoardGame extends Component {

  render() { 
    const { game } = this.props
    return (
      <li>
        {game.title}
        <Button 
        className="plus"
        onClick={() => this.props.handleAddToCollection(game.id)}
        >
          +
        </Button>
      </li>
    )
  }
}