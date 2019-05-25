
const MONGO_PORT = 27017;
const MONGO_URL = 'localhost';
const dbName = 'graphExample';

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${dbName}`, {
    useMongoClient: true
});

const connection = mongoose.connection

connection.on('close', () => {
  console.log('MongoDB connection closed')
  process.exit(0)
})

module.exports = mongoose