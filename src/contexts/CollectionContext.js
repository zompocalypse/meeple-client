import React, { Component } from 'react';

const CollectionContext = React.createContext({
  userData: {
    collectionPath: '',
  },
  error: null,
  setError: () => {},
  clearError: () => {},
  setUserData: () => {},
});

export default CollectionContext;

export class CollectionProvider extends Component {
  state = {
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

  setError = (error) => {
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  render() {
    const value = {
      userData: this.state.userData,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUserData: this.setUserData,
    };
    return (
      <CollectionContext.Provider value={value}>
        {this.props.children}
      </CollectionContext.Provider>
    );
  }
}
