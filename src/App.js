import React, { Component } from 'react'
import { graphql, Query } from 'react-apollo'
import gql from 'graphql-tag'

class App extends Component {
  render() {
    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in
            Apollo Client. Edit the source code and watch your browser window
            reload with the changes.
          </p>
          <p>
            The code which renders this component lives in{' '}
            <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and
            ids.
          </p>
        </header>
        <ul>
          <button
            onClick={() => {
              this.props.addPost('test')
            }}
          >
            add test post
          </button>
          <Query
            query={gql`
              query {
                hello
              }
            `}
          >
            {({ data }) => data.hello || 'loading'}
          </Query>
        </ul>
      </main>
    )
  }
}

const WITH_CREATE_POST = gql`
  mutation($text: String) {
    createPost(text: $text) {
      id
      text
    }
  }
`

const withCreatePost = graphql(WITH_CREATE_POST, {
  props: ({ mutate }) => ({
    addPost: text => {
      mutate({
        variables: {
          input: { text }
        },
        optimisticResponse: {
          createPost: {
            __typename: 'Post',
            id: null,
            text
          }
        }
      })
    }
  })
})

export default withCreatePost(App)
