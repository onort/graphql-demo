import express from 'express'
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'

const Schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const Root = {
  hello: () => {
    return 'Hello World!'
  }
}

const app = express()

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  rootValue: Root,
  graphiql: true
}))

app.listen(4000, () => console.log('Running App on port 4000')) // eslint-disable-line no-console

