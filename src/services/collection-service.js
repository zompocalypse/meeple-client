import config from '../config';
import TokenService from '../services/token-service';

const CollectionApiService = {
  getByCollectionPath(collectionPath) {
    return fetch(`${config.API_ENDPOINT}/collections/${collectionPath}`, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getByCollectionId(collectionPath, collectionId) {
    return fetch(
      `${config.API_ENDPOINT}/collections/${collectionPath}/${collectionId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }
    ).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  addToCollection(gameId) {
    return fetch(`${config.API_ENDPOINT}/collections`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        boardgame_id: gameId,
      }),
    });
  },
  removeCollectionItem(collectionPath, collectionId) {
    return fetch(
      `${config.API_ENDPOINT}/collections/${collectionPath}/${collectionId}`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          Authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }
    );
  },
  updateCollectionItem(collectionPath, collectionId, newData) {
    return fetch(
      `${config.API_ENDPOINT}/collections/${collectionPath}/${collectionId}`,
      {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          Authorization: `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(newData),
      }
    )
      .then((res) => {
        if (!res.ok) res.json().then((e) => Promise.reject(e));
      })
      .catch((error) => {
        this.setState({ error });
      });
  },
  getBoardGames() {
    return fetch(`${config.API_ENDPOINT}/boardgames/`, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getBoardGameRatings() {
    return fetch(`${config.API_ENDPOINT}/boardgames/average/rating`, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  addNewGame(
    title,
    tagline,
    description,
    type,
    minimum_players,
    maximum_players
  ) {
    return fetch(`${config.API_ENDPOINT}/boardgames`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title,
        tagline,
        description,
        type,
        minimum_players,
        maximum_players,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default CollectionApiService;
