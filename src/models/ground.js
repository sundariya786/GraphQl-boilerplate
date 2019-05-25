let mongoose = require('mongoose');
import {Random} from '../healpers';

const  GroundSchema = mongoose.Schema({
    _id: {type: String, default: Random.id},
    name: String,
    description: String,
    city: String,
    games: Array,
    is_full: Boolean,
    active_games: Array,
    owner_id: String,
});

const  Ground = mongoose.model('grounds', GroundSchema);
export default Ground;
