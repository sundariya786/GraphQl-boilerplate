import * as db from './../../models/index';

export  const schema = `

    #Ground information 

    type Ground {
        id: String!
        name: String
        description: String
        city: City
        games : [Game]
        isFull: Boolean
        activeGames: [Game]
        ownerInfo: User
    }
`;

export const resolvers = {
    Ground: {
        id: ({ _id }) => _id,
        async city({ city }){
            return await db.City.findById({ _id: city})
        },
        async games({ games }) {
            return await db.Game.find({ _id: {$in : games }})
        },
        isFull : ({ is_full }) => is_full,
        async activeGames({active_games}) {
            return await db.Game.find({ _id: {$in : active_games }});
        },
        async ownerInfo({ owner_id }){
            return await db.User.findById({_id: owner_id })
        }
    }
}