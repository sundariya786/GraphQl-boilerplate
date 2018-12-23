// import express from 'express';
// import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
// import bodyParser from 'body-parser';
// import schema from './src/schema';
// const cors = require('cors')

// import {User} from './src/models/users';

// const GRAPHQL_PORT = 5000;
// const MONGO_PORT = 27017;
// const MONGO_URL = 'localhost';
// const dbName = 'graphExample';

// let mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${dbName}`, {
//     useMongoClient: true
// });

// const graphQLServer = express();
// graphQLServer.use(cors())

// //graphQL
// graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
// graphQLServer.use('/graphiql', graphiqlExpress({
//   endpointURL: '/graphql',
//   subscriptionsEndpoint: `ws://localhost:${GRAPHQL_PORT}/subscriptions`,
// }));

// //rest api instead
// graphQLServer.get('/users', (req, res, next) => {
//     User.find({}).exec((_err, _res) => res.json(_res));
// });

// graphQLServer.listen(GRAPHQL_PORT, () =>
//   console.log(
//     `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
//   )
// );


// const { createServer } = require('http')
// const express = require('express')
// const bodyParser = require('body-parser')
// const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
// const { SubscriptionServer } = require('subscriptions-transport-ws')
// const { subscribe, execute } = require('graphql')
// import schema from './src/schema';
// const db = require('./db');

// const app = express()

// const dev = process.env.NODE_ENV !== 'production'
// const PORT = process.env.PORT || 5000


// app.use(bodyParser.json())

// app.use(
//   '/graphql',
//   graphqlExpress({
//     context: {
//       db
//     },
//     schema
//   })
// )

// app.use(
//   '/graphiql',
//   graphiqlExpress({
//     endpointURL: '/graphql',
//     subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
//   })
// )

// const server = createServer(app)

// server.listen(PORT, err => {
//   if (err) throw err

//   new SubscriptionServer(
//     {
//       schema,
//       execute,
//       subscribe,
//       onConnect: () => console.log('Client connected')
//     },
//     {
//       server,
//       path: '/subscriptions'
//     }
//   )

//   console.log(`> Ready on PORT ${PORT}`)
// })



import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';

import schema from './src/schema';

import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

const PORT = 4000;
const server = express();
const MONGO_PORT = 27017;
const MONGO_URL = 'localhost';
const dbName = 'graphExample';

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${dbName}`);

server.use('*', cors({ origin: 'http://localhost:3000' }));

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
}));

// We wrap the express server so that we can attach the WebSocket for subscriptions
const ws = createServer(server);

ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);

  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions',
  });
});

