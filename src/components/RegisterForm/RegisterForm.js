import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service'
import { Input, Required, Button } from '../Utils/Utils'

export default class RegisterForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { first_name, last_name, collection_path, email, password } = ev.target

    this.setState({ error: null })
    AuthApiService.postUser({
      email: email.value,
      password: password.value,
      first_name: first_name.value,
      last_name: last_name.value,
      collection_path: collection_path.value,
    })
      .then(user => {
        first_name.value = ''
        last_name.value = ''
        collection_path.value = ''
        email.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='RegistrationForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='first_name'>
          <label htmlFor='RegistrationForm_first_name'>
            First Name
          </label>
          <Input
            name='first_name'
            type='text'
            required
            id='RegistrationForm_first_name'>
          </Input>
        </div>
        <div className='last_name'>
          <label htmlFor='RegistrationForm_last_name'>
            Last Name
          </label>
          <Input
            name='last_name'
            type='text'
            required
            id='RegistrationForm_last_name'>
          </Input>
        </div>
        <div className='collection_path'>
          <label htmlFor='RegistrationForm_collection_path'>
            Collection Path
          </label>
          <Input
            name='collection_path'
            type='text'
            required
            id='RegistrationForm_collection_path'>
          </Input>
        </div>
        <div className='email'>
          <label htmlFor='RegistrationForm_email'>
            Email <Required />
          </label>
          <Input
            name='email'
            type='text'
            required
            id='RegistrationForm_email'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='RegistrationForm_password'>
            Password <Required />
          </label>
          <Input
            name='password'
            type='password'
            required
            id='RegistrationForm_password'>
          </Input>
        </div>
        <Button type='submit'>
          Register
        </Button>
      </form>
    )
  }
}