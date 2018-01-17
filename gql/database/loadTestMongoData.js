const { MongoClient } = require('mongodb');
const assert = require('assert');
const { nodeEnv } = require('../lib/util');
const mongoConfig = require('../config/mongo')[nodeEnv];

MongoClient.connect(mongoConfig.url, (err, db) => {
  assert.equal(null, err);
  const mdb = require('../database/mdb')(db);

  //Drop collections if exists
  //db.dropCollection("sequences");
  //db.dropCollection("trades");

  //Create collections
  //db.createCollection("sequences");
  //db.createCollection("trades");

  //Insert data into the sequences collection, to be used for auto-increment of _id fields
  // db.collection("sequences").insertMany([
  //   {_id:"tradeId", sequence_value:0},
  //   {_id:"transferId", sequence_value:0},
  //   {_id:"transportId", sequence_value:0},
  //   {_id:"stockId", sequence_value:0}
  // ]);

  //Insert data into trades collection
  mdb.getNextSequenceValue("tradeId", function(id){
    if(id){
      db.collection('trades').insertOne({
        _id: id,
        side: 'SELL',
        qty: 2000000,
        price: 1606.5,
        tradeDt: new Date("2018-02-15"),
        status: 'OPEN',
        cmdty: 'AL',
        loc: 'LON'
      }).then(response => {
        console.log(response);
        db.close();
      });
    }
  });

  // mdb.getNextSequenceValue("tradeId", function(id){
  //   if(id){
  //     db.collection('trades').insertOne({
  //       _id: id,
  //       side: 'SELL',
  //       qty: 2000000,
  //       price: 1606.5,
  //       tradeDt: new Date("2018-02-15"),
  //       status: 'OPEN',
  //       cmdty: 'AL',
  //       loc: 'LON'
  //     }).then(response => {
  //       console.log(response);
  //     });
  //   }
  // });

  // db.collection('trades').insertOne({
  //   _id: mdb.getNextSequenceValue("tradeId"),
  //   side: 'BUY',
  //   qty: 2000000,
  //   price: 1606.5,
  //   tradeDt: new Date("2017-12-28"),
  //   status: 'OPEN',
  //   cmdty: 'AL',
  //   loc: 'BA'
  // })
  // .then(response => {
  //   console.log(response);
  //   db.close();
  // });
  // db.collection('trades').insertMany([

  //   mdb.getNextSequenceValue("tradeId", function(id){
  //     if(id){
  //       return {
  //         _id: id,
  //         side: 'BUY',
  //         qty: 2000000,
  //         price: 1606.5,
  //         tradeDt: new Date("2017-12-28"),
  //         status: 'OPEN',
  //         cmdty: 'AL',
  //         loc: 'BA'
  //       }
  //     }
  //   }),

  //   mdb.getNextSequenceValue("tradeId", function(id){
  //     if(id){
  //       return {
  //         _id: id,
  //         side: 'BUY',
  //         qty: 2000000,
  //         price: 1606.5,
  //         tradeDt: new Date("2017-12-28"),
  //         status: 'OPEN',
  //         cmdty: 'AL',
  //         loc: 'BA'
  //       }
  //     }
  //   })
  // ]).then(response => {
  //   console.log(response);
  //   db.close();
  // });
});
