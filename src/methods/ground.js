import { Random } from "../healpers";
import * as db from '../models/index';

export async function add ({name, description,  city, games, isFull, activeGames, ownerId}) {
   const groundObj = {
    name,
    description,
    city,
    games,
    is_full: isFull,
    active_games: activeGames,
    owner_id: ownerId
   }

    return await db.Ground.create(groundObj);
}