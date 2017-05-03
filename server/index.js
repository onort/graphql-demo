import express from 'express'
import graphqlHTTP from 'express-graphql'
import cors from 'cors'
import errorhandler from 'errorhandler'

import Schema from './schema/schema'

const PORT = 3000
const app = express()

app.use(errorhandler())
app.use(cors()) // Allow graphql endpoint to be loaded cross-origin
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
}))

app.listen(PORT, () => console.log(`App is running on port ${PORT}`)) // eslint-disable-line
