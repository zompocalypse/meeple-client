import React, { Component } from 'react';
import { Button, Input, Required, Textarea } from '../../components/Utils/Utils'
import CollectionApiService from '../../services/collection-service';

export default class NewGameForm extends Component {
  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { title, tagline, description, type, minimum_players, maximum_players } = ev.target
    
    this.setState({ error: null })
    CollectionApiService.addNewGame(
      title.value,
      tagline.value,
      description.value,
      type.value,
      minimum_players.value,
      maximum_players.value,
    )
      .then(game => {
        title.value = ''
        tagline.value = ''
        description.value = ''
        type.value = ''
        minimum_players.value = ''
        maximum_players.value = ''
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='NewGameForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='title'>
          <label htmlFor='NewGame_title'>
            Title
          </label>
          <Input
            name='title'
            type='text'
            required
            id='NewGame_title'>
          </Input>
        </div>
        <div className='tagline'>
          <label htmlFor='NewGame_tagline'>
            Tagline
          </label>
          <Input
            name='tagline'
            type='text'
            required
            id='NewGame_tagline'>
          </Input>
        </div>
        <div className='description'>
          <label htmlFor='NewGame_description'>
            Description
          </label>
          <Textarea
            name='description'
            type='text'
            required
            id='NewGame_description'>
          </Textarea>
        </div>
        <div className='type'>
          <label htmlFor='NewGame_type'>
            Type <Required />
          </label>
          <Input
            name='type'
            type='text'
            required
            id='NewGame_type'>
          </Input>
        </div>
        <div className=''>
          <label htmlFor='NewGame_minimum_players'>
            Min Players <Required />
          </label>
          <Input
            name='minimum_players'
            type='text'
            required
            id='NewGame_minimum_players'>
          </Input>
        </div>
        <div className='maximum_players'>
          <label htmlFor='NewGame_maximum_players'>
            Max Players <Required />
          </label>
          <Input
            name='maximum_players'
            type='text'
            required
            id='NewGame_maximum_players'>
          </Input>
        </div>
        <Button type='submit'>
          Add New Game
        </Button>
      </form>
    )
  }
}