import * as db from './../../models/index';
import { Game } from '../../methods';

export const  mutations = `
    #### A mutation to register game
    # **name**: *name of the game*
    # **description** : *description of game*
    # **playerCount** : *number  of  player can participant*
    # **duration**: *duration of game*,
    addGame(name: String, description: String, playerCount: Int, duration: String): Game
`;


export const resolvers = {
    async addGame (_, {name, description,  playerCount, duration}) {
        return Game.add({name, description,  playerCount, duration});
    }
}