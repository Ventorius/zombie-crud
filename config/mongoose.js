const mongoose = require('mongoose');
const { mongo, env } = require('./vars');

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

if (env === 'development') {
  mongoose.set('debug', true);
}

let mongoUri;

switch (process.env.NODE_ENV) {
  case 'dev':
    mongoUri = mongo.devUri;
    break;
  case 'prod':
    mongoUri = mongo.uri;
    break;
  case 'test':
    mongoUri = mongo.testUri;
    break;
  default:
    mongoUri = mongo.devUri;
    break;
}

exports.connect = () => {
  mongoose.connect(mongoUri, {
    keepAlive: 1,
    useNewUrlParser: true,
  });
  return mongoose.connection;
};
