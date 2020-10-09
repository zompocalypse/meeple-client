import React, { Component } from 'react';
import BoardGame from '../BoardGame/BoardGame'

export default class BoardGameList extends Component {
  
  render() { 
    const { boardGameList = [] } = this.props
    return boardGameList
      
      .map(game =>
      <BoardGame
        key={game.id}
        game={game}
        handleAddToCollection={this.props.handleAddToCollection}
      />
      )
  }
}