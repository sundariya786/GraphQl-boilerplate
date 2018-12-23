import * as Subs from './subs';


export const SubscriptionDefinition = `
  type Subscriptions {
    ${Subs.schema}
  }
`;

export default {
    Subs,
};
