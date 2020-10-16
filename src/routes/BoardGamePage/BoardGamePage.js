import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BoardGameList from '../../components/BoardGameList/BoardGameList';
import CollectionApiService from '../../services/collection-service';
import CollectionContext from '../../contexts/CollectionContext';
import { Button } from '../../components/Utils/Utils';
import TokenService from '../../services/token-service';

export default class BoardGamePage extends Component {
  static contextType = CollectionContext;

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  state = {
    boardGameList: [],
    userData: {},
  };

  componentDidMount() {
    CollectionApiService.getBoardGames()
      .then(this.setAvailableBoardGames)
      .catch(this.context.setError);
  }

  setAvailableBoardGames = (boardGameData) => {
    this.setState({
      boardGameList: boardGameData,
      userData: TokenService.getCollectionPath(),
    });
  };

  handleAddToCollection = (gameId) => {
    CollectionApiService.addToCollection(gameId)
      .then((data) => data.json())
      .catch(this.context.setError);

    this.setAvailableBoardGames(
      this.state.boardGameList.filter((item) => item.id !== gameId)
    );
  };

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const { boardGameList, userData } = this.state;
    return (
      <>
        <div className="flex end go-back">
          <Button onClick={this.goBack} className="hollow go-back">
            Back to Collection
          </Button>
        </div>
        <h2>Available Board Games</h2>
        <Link to={`/${userData.collection_path}/add-to-collection/create-new`}>
          Create new game
        </Link>
        <br />
        {this.state.hideShowNewGameForm && this.renderNewGameForm()}
        <br />
        <BoardGameList
          boardGameList={boardGameList}
          handleAddToCollection={this.handleAddToCollection}
        />
        <br />
      </>
    );
  }
}
