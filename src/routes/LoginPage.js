import React, { Component } from 'react'
import LoginForm from '../components/LoginForm/LoginForm'
import { Section } from '../components/Utils/Utils'

import CollectionContext from '../contexts/CollectionContext'

export default class LoginPage extends Component {
  static contextType = CollectionContext

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = userData => {
    const { collection_path } = userData
    const { history } = this.props
    this.context.setUserData(userData)
    history.push(`/${collection_path}`)
  }

  render() {
    return (
      <Section className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </Section>
    )
  }
}
