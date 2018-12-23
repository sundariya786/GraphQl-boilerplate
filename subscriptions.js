import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { SubscriptionManager } from 'graphql-subscriptions';
import { MergedResolvers, MergedSchema, setupFunctions } from './src/data';
// import pubsub from './pubsub';
import db from './src/models';
// import { hashLoginToken, log } from './helpers';

export default function (websocketServer) {
    const schema = makeExecutableSchema({
        typeDefs : MergedSchema,
        resolvers: MergedResolvers,
    });
    return new SubscriptionServer(
        {
            schema,
            execute,
            subscribe,
            onConnect: () => console.log('Client connected')
            
        }, {
            server: websocketServer,
            path  : '/subscriptions',
        },
    );
}

