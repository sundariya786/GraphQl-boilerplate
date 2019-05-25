import { Ground } from '../../methods';

export const  mutations = `
    #### A mutation to register game
    # **name**: *name of the game*
    # **description** : *description of game*
    # **city** : *city id of the ground*
    # **games**: *array of games ids*,
    # **isFull** : *boolean value  that indicate  ground is  full or not*
    # **activeGames**: *array  of active  game ids*
    # **ownerId**: *ground  owner  id *,
    addGround(name: String, description: String, city: String, games: [String], isFull: Boolean, activeGames: [String], ownerId: String): Ground
`;


export const resolvers = {
    async addGround (_, {name, description,  city, games, isFull, activeGames, ownerId}) {
        return Ground.add({name, description,  city, games, isFull, activeGames, ownerId});
    }
}