const { MongoClient } = require('mongodb');

const dbName = 'nosaj';
const dbUrl = `mongodb://localhost:27017/${dbName}`;

let DB;

module.exports = hitCountFactory();


function hitCountFactory() {
  dbConnect().then(db => DB = db);
  return {
    track: trackHit,
    getFor: getHitsFor,
  };

}

function dbConnect() {
  return new Promise(connectHandler);
  
  function connectHandler(resolve, reject) {
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) return reject(err);
      if (db) {
        DB = db;
      }
    })
  }
}

/**
 * Track Hit
 */
function trackHit(hitdata) {
  if (! DB) {
    return console.log('Not tracking hit because db is not connected yet...');
  }
  if (typeof hitdata !== 'object') {
    return Promise.reject(() => 
      new Error(`hitdata must be of type: 'object', provided ${typeof hitdata}`)
    );
  }
  if (! ('property' in hitdata)) {
    return Promise.reject(() => 
      new Error('\'property\' prop is required to record a hit so that it can be tracked.')
    );
  }
  const hitsCollection = DB.collection('hits');
  hitsCollection.insertOne(hitdata);
  return Promise.resolve(hitdata);
}


/**
 * Get Hits For Property
 * 
 * @param {String} property - the property name to saerch in collections for
 */
function getHitsFor(property) {
  if (! DB) {
    return console.log('Not showing hits because db is not connected yet...');
  }
  if (typeof property !== 'string') {
    return new Error(`property must be of type: 'string', provided ${typeof property}`);
  }
  return new Promise(handlePromise)
  
  function handlePromise(resolve, reject) {
    const hitsCollection = DB.collection('hits');
    hitsCollection.find({ property }).toArray(handleFind);
    function handleFind(err, docs) {
      if (err) return reject(err);
      resolve(docs);
    }
  }
}
