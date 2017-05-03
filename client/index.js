import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import './reset.css'
import './index.css'

import App from './App'
import { NavMenu, UsersList, UserProfile } from './components'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:3000/graphql'}),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <NavMenu />
        <Route exact path="/" component={App} />
        <Route path="/users" component={UsersList} />
        <Route path="/user/:userId" component={UserProfile} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('app')
)
