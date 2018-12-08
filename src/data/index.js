import Schema from './schema';
import Mutations, { MutationDefinition } from './mutations';
// import Subscriptions, { SubscriptionDefinition } from './subscriptions';

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutations
  }
`;
const MergedSchema    = [SchemaDefinition, MutationDefinition];
const MergedResolvers = { Mutations: {} };

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


// Object.keys(Subscriptions).forEach((key) => {
//     const s = Subscriptions[key];
//     if (s.resolvers) Object.assign(MergedResolvers.Subscriptions, s.resolvers);
//     if (s.setupFunctions) Object.assign(setupFunctions, s.setupFunctions);
// });

export { MergedSchema, MergedResolvers };
