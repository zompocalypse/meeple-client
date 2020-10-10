import React, { Component } from 'react';

const CollectionContext = React.createContext({
  collectionList: [],
  boardGameList: [],
  userData: {
    collectionPath: '',
  },
  error: null,
  setError: () => {},
  clearError: () => {},
  setCollectionList: () => {},
  setUserData: () => {},
  setAvailableBoardGames: () => {},
});

export default CollectionContext;

export class CollectionProvider extends Component {
  state = {
    collectionList: [],
    boardGameList: [],
    userData: {
      collectionPath: '',
    },
    error: null,
  };

  setUserData = (userData) => {
    const { collection_path, user_id, first_name, sub } = userData;
    this.setState({
      userData: {
        userId: user_id,
        firstName: first_name,
        email: sub,
        collectionPath: collection_path,
      },
    });
  };

  setAvailableBoardGames = (boardGameData) => {
    this.setState({ boardGameList: boardGameData });
  };

  setCollectionList = (collectionListData) => {
    this.setState({ collectionList: collectionListData });
  };

  setError = (error) => {
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  render() {
    const value = {
      collectionList: this.state.collectionList,
      boardGameList: this.state.boardGameList,
      userData: this.state.userData,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setCollectionList: this.setCollectionList,
      setUserData: this.setUserData,
      setAvailableBoardGames: this.setAvailableBoardGames,
    };
    return (
      <CollectionContext.Provider value={value}>
        {this.props.children}
      </CollectionContext.Provider>
    );
  }
}
