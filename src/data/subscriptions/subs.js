import { withFilter } from 'graphql-subscriptions';
import {pubsub} from '../../pubsub';
import EventType from '../../types/event';

export const Types = {
    NEW_PRODUCT_ADDED: 'NEW_PRODUCT_ADDED',
};


export const schema = `
    # subscription for new Product added
    messageAdded(channelId: ID!): Product
    liveProduct: Product
`;

export const resolvers = {
    liveProduct: {
        subscribe: () => pubsub.asyncIterator('NEW_PRODUCT_ADDED')
        // subscribe: withFilter(() => pubsub.asyncIterator(Types.NEW_PRODUCT_ADDED), (payload, vars, context) => {
        //     console.log( 'subscription');
        //     console.log('payload', payload);

        // }),
    },
    messageAdded: {
        subscribe: withFilter(() => pubsub.asyncIterator('messageAdded'), (payload, variables) => {
          // The `messageAdded` channel includes events for all channels, so we filter to only
          // pass through events for the channel specified in the query
          return true;
        }),
    },
    // messageAdded:{
    //     subscribe: () => pubsub.asyncIterator('NEW_MESSAGE')
    // }
};
export const setupFunctions = {
    liveProduct: (options, args ) => {
        console.log('options ', options, '\n args ', args);
    }
}
