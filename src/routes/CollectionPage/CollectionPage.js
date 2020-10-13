import React, { Component } from 'react';
import CollectionContext from '../../contexts/CollectionContext';
import CollectionApiService from '../../services/collection-service';
import CollectionItem from '../../components/CollectionItem/CollectionItem.js';
import jwt_decode from 'jwt-decode';
import TokenService from '../../services/token-service';
import { Section } from '../../components/Utils/Utils';
import { Link } from 'react-router-dom';

import './CollectionPage.css';

export default class CollectionPage extends Component {
  static contextType = CollectionContext;

  state = {
    collectionList: [],
    boardGameRating: [],
  };

  async componentDidMount() {
    CollectionApiService.getByCollectionPath(
      this.props.match.params.collection_path
    )
      .then(this.context.setUserData(jwt_decode(TokenService.getAuthToken())))
      .then(this.setCollectionList)
      .catch(this.context.setError);

    CollectionApiService.getBoardGameRatings()
      .then(this.setBoardGameRatings)
      .catch(this.context.setError);
  }

  setCollectionList = (collectionListData) => {
    this.setState({ collectionList: collectionListData });
  };

  setBoardGameRatings = (boardGameRating) => {
    this.setState({ boardGameRating: boardGameRating });
  };

  renderCollection = () => {
    const { collectionList = [] } = this.state;
    return (
        <div>
          {collectionList.map((item) => (
            <CollectionItem key={item.id} collection={item} />
          ))}
        </div>
    );
  };

  render() {
    const { error, userData } = this.context;
    return (
      <>
        <Section>
          <div className="CollectionList">
            {this.props.match.params.collection_path ===
            userData.collectionPath ? (
              <Link to={`/${userData.collectionPath}/add-to-collection`}>
                Add games to collection
              </Link>
            ) : (
              ''
            )}
            {error ? <p>An error occurred</p> : this.renderCollection()}
          </div>
        </Section>
      </>
    );
  }
}
