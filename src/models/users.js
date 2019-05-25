let mongoose = require('mongoose');
import {Random} from '../healpers'

const UserSchema = mongoose.Schema({
    _id: { type: String, default: Random.id },
    createdAt: Date,
    services: Object,
    user_name: String,
    email: String,
    profile: String,
    roles: { type: Array, default: [] },
    status: String,
    online: Boolean,
    disabled: Boolean,
    followers: Array
});

const User = mongoose.model('users', UserSchema);
export default User;