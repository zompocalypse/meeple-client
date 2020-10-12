import React, { Component } from 'react';
import CollectionContext from '../contexts/CollectionContext';
import CollectionApiService from '../services/collection-service';
import CollectionItem from '../components/CollectionItem/CollectionItem.js';
import BoardGameList from '../components/BoardGameList/BoardGameList';
import jwt_decode from 'jwt-decode';
import TokenService from '../services/token-service';
import { Section, Button } from '../components/Utils/Utils';
import NewGameForm from '../components/NewGameForm/NewGameForm';
import CollectionItemDetailView from '../components/CollectionItemDetailView/CollectionItemDetailView';

import './CollectionPage.css';

export default class CollectionPage extends Component {
  static contextType = CollectionContext;

  state = {
    hideShowGames: false,
    hideShowNewGameForm: false,
    expandedCollectionItem: {},
    collectionList: [],
    boardGameList: [],
  };

  componentDidMount() {
    CollectionApiService.getByCollectionPath(
      this.props.match.params.collection_path
    )
      .then(this.context.setUserData(jwt_decode(TokenService.getAuthToken())))
      .then(this.setCollectionList)
      .catch(this.context.setError);

    CollectionApiService.getBoardGames()
      .then(this.setAvailableBoardGames)
      .catch(this.context.setError);
  }

  setAvailableBoardGames = (boardGameData) => {
    this.setState({ boardGameList: boardGameData });
  };

  setCollectionList = (collectionListData) => {
    this.setState({ collectionList: collectionListData });
  };

  toggleAddNewGameForm = () => {
    this.setState({ hideShowNewGameForm: !this.state.hideShowNewGameForm });
  };

  renderNewGameForm = () => {
    return <NewGameForm />;
  };

  renderBoardGameList = () => {
    const { boardGameList = [] } = this.state;
    return (
      <>
        <Button
          onClick={() => this.toggleAddNewGameForm()}
          className="add_new_game"
        >
          New Game
        </Button>
        {this.state.hideShowNewGameForm && this.renderNewGameForm()}
        <BoardGameList
          boardGameList={boardGameList}
          handleAddToCollection={this.handleAddToCollection}
        />
      </>
    );
  };

  renderCollection = () => {
    const { collectionList = [] } = this.state;
    return (
      <ul>
        {collectionList.map((item) => (
          <CollectionItem
            key={item.id}
            collection={item}
            expandCollectionDetails={this.expandCollectionDetails}
          />
        ))}
      </ul>
    );
  };

  addToCollection = (collectionList) => {
    this.setState({ collectionList });
  };

  toggleGames = () => {
    this.setState({ hideShowGames: !this.state.hideShowGames });
  };

  handleAddToCollection = (gameId) => {
    CollectionApiService.addToCollection(gameId)
      .then((data) => data.json())
      .then((data) =>
        this.addToCollection([...this.state.collectionList, data])
      );
    this.setAvailableBoardGames(
      this.state.boardGameList.filter((item) => item.id !== gameId)
    );
  };

  expandCollectionDetails = (collectionId) => {
    const expandedItem = this.state.collectionList.filter(
      (collection) => collection.id === collectionId
    );
    this.setState({
      expandedCollectionItem: expandedItem[0],
    });
  };

  removeFromCollection = (collectionList) => {
    this.setState({ collectionList, expandedCollectionItem: {} });
  };

  handleRemoveFromCollection = (idToRemove, boardgame_id, title) => {
    const collectionPath = this.context.userData.collectionPath;
    const newAvailableBoardGame = { id: boardgame_id, title: title };
    CollectionApiService.removeCollectionItem(collectionPath, idToRemove);
    this.removeFromCollection(
      this.state.collectionList.filter((item) => item.id !== idToRemove)
    );
    this.setAvailableBoardGames([
      ...this.state.boardGameList,
      newAvailableBoardGame,
    ]);
  };

  render() {
    const { error, userData } = this.context;
    return (
      <>
        <Section>
          {this.props.match.params.collection_path ===
          userData.collectionPath ? (
            <Button onClick={() => this.toggleGames()} className="standard">
              Add
            </Button>
          ) : (
            ''
          )}
        </Section>
        <Section className="MainView">
          <div className="CollectionList">
            {this.state.hideShowGames && this.renderBoardGameList()}
            {error ? <p>An error occurred</p> : this.renderCollection()}
          </div>
          <div className="DetailView">
            <CollectionItemDetailView
              expandedCollectionItem={this.state.expandedCollectionItem}
              handleRemoveFromCollection={this.handleRemoveFromCollection}
            />
          </div>
        </Section>
      </>
    );
  }
}
