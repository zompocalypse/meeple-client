import config from '../config'
import TokenService from '../services/token-service'

const CollectionApiService = {
  getByCollectionPath(collectionPath) {
    return fetch(`${config.API_ENDPOINT}/collections/${collectionPath}`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },
  addToCollection(gameId) {
    return fetch(`${config.API_ENDPOINT}/collections`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        boardgame_id: gameId,
      })
    })
  },
  updateCollectionItem(collectionId) {
    
  },
  getBoardGames() {
    return fetch(`${config.API_ENDPOINT}/boardgames/`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
      )
  },
  addNewGame(title, tagline, description, type, minimum_players, maximum_players) {
    return fetch(`${config.API_ENDPOINT}/boardgames`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title,
        tagline,
        description,
        type,
        minimum_players,
        maximum_players,
      }),
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
      )
  },
}

export default CollectionApiService