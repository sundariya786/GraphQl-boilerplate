import { Random } from "../healpers";
import * as db from '../models/index';

export async function add ({name, description,  playerCount, duration}) {
   const gameObj = {
    name,
    description, 
    player_count: playerCount,
    duration
   }

    return await db.Game.create(gameObj);
}