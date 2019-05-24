let mongoose = require('mongoose');
import {Random} from '../healpers'

const ProfileSchema = mongoose.Schema({
    _id: { type: String, default: Random.id },
    first_name: String,
    last_name: String,
    zip:Number, 
    mobile_num: Number,
    city: String,
    games: Array
});

const Profile = mongoose.model('profile', ProfileSchema);
export default Profile;