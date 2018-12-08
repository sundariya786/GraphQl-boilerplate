import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './src/schema';

import {User} from './src/models/users';

const GRAPHQL_PORT = 3000;
const MONGO_PORT = 27017;
const MONGO_URL = 'localhost';
const dbName = 'graphExample';

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${dbName}`, {
    useMongoClient: true
});

const graphQLServer = express();

//graphQL
graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

//rest api instead
graphQLServer.get('/users', (req, res, next) => {
    User.find({}).exec((_err, _res) => res.json(_res));
});

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
