import Schema from './schema';
import Mutations, { MutationDefinition } from './mutations';
import Subscriptions, { SubscriptionDefinition } from './subscriptions';

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutations
    subscription: Subscriptions
}
`;
const MergedSchema    = [SchemaDefinition, MutationDefinition, SubscriptionDefinition];
// const MergedSchema    = [SchemaDefinition, MutationDefinition];
const MergedResolvers = { Mutations: {}, Subscriptions: {} };
const setupFunctions  = {};

Object.keys(Schema).forEach((key) => {
    const s = Schema[key];
    if (s.schema) MergedSchema.push(s.schema);
    if (s.resolvers) Object.assign(MergedResolvers, s.resolvers);
});

Object.keys(Mutations).forEach((key) => {
    const m = Mutations[key];
    if (m.resolvers) {
        Object.keys(m.resolvers).forEach((name) => {
            MergedResolvers.Mutations[name] = m.resolvers[name];
        });
    }
});

// // console.log('subscription: ', Subscriptions);
Object.keys(Subscriptions).forEach((key) => {

    const s = Subscriptions[key];
    // console.log('s ', MergedResolvers.Subscriptions, '\nabc :', s.resolvers);
    if (s.resolvers) Object.assign(MergedResolvers.Subscriptions, s.resolvers);
    if (s.setupFunctions) Object.assign(setupFunctions, s.setupFunctions);
});

export { MergedSchema, MergedResolvers, setupFunctions };
