import * as db from './../../models/index';

export  const schema = `

    #Game information 

    type Game {
        id: String!
        name: String
        description: String
        playerCount: Int
        duration : String
    }
`;

export const resolvers = {
    Game: {
        id: ({ _id }) => _id,
        playerCount: ({ player_count }) => player_count,
    }
}