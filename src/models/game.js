let mongoose = require('mongoose');
import {Random} from '../healpers';

const  GameSchema = mongoose.Schema({
    _id: {type: String, default: Random.id},
    name: String,
    description: String,
    player_count: Number,
    duration: String
});

const  Game = mongoose.model('games', GameSchema);
export default Game;
