const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const DataLoader = require('dataloader');

// const pg = require('pg');
// const pgConfig = require('../config/pg')[nodeEnv];
// const pgPool = new pg.Pool(pgConfig);
// const pgdb = require('../database/pgdb')(pgPool);

const app = require('express')();

const ncSchema = require('../schema');
const graphqlHTTP = require('express-graphql');

const { MongoClient } = require('mongodb');
const assert = require('assert');
const mConfig = require('../config/mongo')[nodeEnv];

MongoClient.connect(mConfig.url, (err, mPool) => {
  assert.equal(err, null);
  const mdb = require('../database/mdb')(mPool);

  app.use('/graphql', (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    }

    const loaders = {
      getAllTrades: mdb.getAllTrades,
      searchTrades: mdb.searchTrades,
      getAllTransports: mdb.getAllTransports(),
      searchTransports: mdb.searchTransports,
      findTrades: mdb.findTrades,
      findTransCat: mdb.findTransCat,
      findTrans: mdb.findTrans
    };
    graphqlHTTP({
      schema: ncSchema,
      graphiql: true,
      //context: { pgPool, mPool, loaders }
      context: { mPool, loaders }
    })(req, res);
  });

  const PORT = process.env.PORT || 3010;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
