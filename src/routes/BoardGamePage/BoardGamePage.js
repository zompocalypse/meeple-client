import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BoardGameList from '../../components/BoardGameList/BoardGameList';
import CollectionApiService from '../../services/collection-service';
import CollectionContext from '../../contexts/CollectionContext';
import { Button } from '../../components/Utils/Utils';

export default class BoardGamePage extends Component {
  static contextType = CollectionContext;

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  state = {
    boardGameList: [],
  };

  componentDidMount() {
    CollectionApiService.getBoardGames()
      .then(this.setAvailableBoardGames)
      .catch(this.context.setError);
  }

  setAvailableBoardGames = (boardGameData) => {
    this.setState({ boardGameList: boardGameData });
  };

  handleAddToCollection = (gameId) => {
    CollectionApiService.addToCollection(gameId).then((data) => data.json());

    this.setAvailableBoardGames(
      this.state.boardGameList.filter((item) => item.id !== gameId)
    );
  };

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const { boardGameList } = this.state;
    const { userData } = this.context;
    return (
      <>
        <Link to={`/${userData.collectionPath}/add-to-collection/create-new`}>
          Create new game
        </Link>
        <br />
        {this.state.hideShowNewGameForm && this.renderNewGameForm()}
        <BoardGameList
          boardGameList={boardGameList}
          handleAddToCollection={this.handleAddToCollection}
        />
        <br />
        <Button onClick={this.goBack} className="go-back">
          Back to Collection
        </Button>
      </>
    );
  }
}
