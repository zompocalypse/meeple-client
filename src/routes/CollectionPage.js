import React, { Component } from 'react'
import CollectionContext from '../contexts/CollectionContext'
import CollectionApiService from '../services/collection-service'
import CollectionItem from '../components/CollectionItem/CollectionItem.js'
import BoardGameList from '../components/BoardGameList/BoardGameList'
import jwt_decode from 'jwt-decode'
import TokenService from '../services/token-service'
import { Section, Button } from '../components/Utils/Utils'
import NewGameForm from '../components/NewGameForm/NewGameForm'
import CollectionItemDetailView from '../components/CollectionItemDetailView/CollectionItemDetailView'

import './CollectionPage.css'

export default class CollectionPage extends Component {
  static contextType = CollectionContext

  state = {
    hideShowGames: false,
    hideShowNewGameForm: false,
    expandedCollectionItem: {}
  }

  componentDidMount() {
    CollectionApiService.getByCollectionPath(this.props.match.params.collection_path)
      .then(this.context.setUserData(jwt_decode(TokenService.getAuthToken())))
      .then(this.context.setCollectionList)
      .catch(this.context.setError)

    CollectionApiService.getBoardGames()
      .then(this.context.setAvailableBoardGames)
      .catch(this.context.setError)
  }

  toggleAddNewGameForm = () => {
    this.setState({hideShowNewGameForm: !this.state.hideShowNewGameForm })
  }

  renderNewGameForm = () => {
    return (
      <NewGameForm 
        />
    )
  }

  renderBoardGameList = () => {
    const { boardGameList = [] } = this.context
    return (
      <>
        <Button onClick={() => this.toggleAddNewGameForm()} className="add_new_game">New Game</Button>
        {this.state.hideShowNewGameForm &&
          this.renderNewGameForm()
          }
        <BoardGameList
          boardGameList={boardGameList}
          handleAddToCollection={this.handleAddToCollection}
        />
      </>
    )
  }

  renderCollection = () => {
    const { collectionList = [] } = this.context
    return (
      <ul>
        {collectionList.map(item =>
      <CollectionItem
        key={item.id}
        collection={item}
        expandCollectionDetails={this.expandCollectionDetails}
      />
    )}
      </ul>
    )
  }

  toggleGames = () => {
    this.setState({hideShowGames: !this.state.hideShowGames })
  }

  handleAddToCollection = (gameId) => {
    console.log(gameId)
    CollectionApiService.addToCollection(gameId)
    
    this.setState({ error: null })
  }

  expandCollectionDetails = (collectionId) => {
    const expandedItem = this.context.collectionList.filter(collection => collection.id === collectionId)
    this.setState({
      expandedCollectionItem: expandedItem[0]
    })
  }

  render() {
    const { error, userData } = this.context
    return (
      <>
        <Section>
          {(this.props.match.params.collection_path === userData.collectionPath)
          ?
          <Button onClick={() => this.toggleGames()} className="standard">
            Add
          </Button>
          :
          ''
        }
        </Section>
        <Section className="MainView">
          <div className="CollectionList">
          {this.state.hideShowGames &&
          this.renderBoardGameList()
        }
        {error
          ? <p>An error occurred</p>
          : this.renderCollection()}
          </div>
          <div className="DetailView">
            <CollectionItemDetailView
              expandedCollectionItem={this.state.expandedCollectionItem}
            />
          </div>
        </Section>
        
      </>
    )
  }
}