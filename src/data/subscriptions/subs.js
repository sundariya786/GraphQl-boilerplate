// import { withFilter } from 'graphql-subscriptions';
// import pubsub from '../../pubsub';

// export const Types = {
//     LIVE_POST_CHANNEL: 'LIVE_POST_CHANNEL',
// };


// export const schema = `
//     # subscription for new wall posts
//     livePost: PostWithType
// `;

// export const resolvers = {
//     livePost: {
//         subscribe: withFilter(() => pubsub.asyncIterator(Types.LIVE_POST_CHANNEL), (payload, vars, { clientId }) => payload.livePost.post.client_id === clientId),
//     },
// };
