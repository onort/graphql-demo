import express from 'express'
import graphqlHTTP from 'express-graphql'
import Schema from './schema/schema'

const PORT = 3000
const app = express()

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
}))

app.listen(PORT, () => console.log(`App is running on port ${PORT}`)) // eslint-disable-line
