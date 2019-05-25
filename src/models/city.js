let mongoose = require('mongoose');
import {Random} from '../healpers';

const  CitySchema = mongoose.Schema({
    _id: {type: String, default: Random.id},
    name: String,
    description: String,
    zip: Number,
    population: String
});

const  City = mongoose.model('cities', CitySchema);
export default City;
