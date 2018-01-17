const { orderedFor } = require('../lib/util');
const humps = require('humps');
const { slug } = require('../lib/util');
const { findAllTrades, insertTrade } = require('../lib/util');


function getNextSequence(db, name, callback) {
  db.collection("counters").findAndModify( 
    { _id: name }, 
    null, 
    { $inc: { seq: 1 } }, 
    function(err, result){
      if(err) callback(err, result);
      callback(err, result.value.seq);
    } 
);
}

module.exports = mPool => {
  const StatusType = require('./../schema/types/enums/trade-status');
  return {
    getNextSequenceValue(sequenceName, callback) {
      mPool.collection('sequences')
      .findAndModify(
        { "_id": `${sequenceName}` },
        [],
        { "$inc": { "sequence_value" : 1 } },
        { "new": true }
      )
      .then( doc => {
        callback(doc.value.sequence_value);
      })
    },
    getAllTrades() {
      return mPool.collection('trades')
        .find({})
        .toArray()
        .then(rows => rows)
        ;
      //return findAllTrades().then(trades => trades);
    },
    searchTrades(buy, sell, commodity, counterparty, locations, startTd, endTd, transFlg){
      console.log(`calling searchTrades for ${buy} ${sell}  ${commodity} ${counterparty} ${locations} ${startTd} ${endTd} ${transFlg}`);
      let sideArr = [];
      if(buy){
        sideArr.push(buy);
      }
      if(sell){
        sideArr.push(sell);
      }

       var q = {}; // declare the query object
       q['$and']=[]; // filter the search by any criteria given by the user
       if(commodity){ // if the criteria has a value or values
         q["$and"].push({ cmdty: commodity}); // add to the query object
       }
       if(counterparty){
         q["$and"].push({ cp: counterparty});
       }
       if(locations && locations.length>0){
         q["$and"].push({ loc: {$in : locations }});
       }
       if(sideArr.length > 0){
         q["$and"].push({ side: {$in: sideArr }});
       }
       if(startTd && endTd){
        q["$and"].push({ tradeDt: {$gte: startTd, $lte: endTd }});
       }
       if(transFlg){
        q["$and"].push({ "transportId": { "$exists" : true}});
       }
    
      console.log(q);

      return mPool.collection('trades')
        .find(q)
        .toArray()
        .then(rows => {
          return rows
        });
    },
    addNewTrade(input, callback) {
      this.getNextSequenceValue("tradeId", (id) => {
        input._id = id;
        console.log(`id : ${id}`);
        input.status = "OPEN";
        input.tradeDt = new Date(input.tradeDt);
        mPool.collection('trades')
        .insert(
          input ,
          {}
        ).then( doc => {
          console.log(`trade inserted with id : ${id}`);
          callback(doc.ops[0]);
        });
      });
      //return insertTrade(input).then(trade => trade);
    },
    updateTrade(input, callback) {
      console.log(`id : ${input._id}`);
      mPool.collection('trades')
      .update(
        { _id: Number(input._id) },
        { $set: input }
      ).then( doc => {
        console.log(`doc : ${JSON.stringify(doc)}`);
        callback(input);
      });
    },
    addNewTrans(input, callback) {
      this.getNextSequenceValue("transportId", (id) => {
        input._id = id;
        console.log(`id : ${id}`);
        input.loadDt = new Date(input.loadDt);
        input.unloadDt = new Date(input.unloadDt);
        mPool.collection('transports')
        .insert(
          input ,
          {}
        ).then( doc => {
          console.log(`trans inserted with id : ${id}`);
          callback(doc.ops[0]);
        });
      });
    },
    updateTrans(input, callback) {
      console.log(`id : ${input._id}`);
      mPool.collection('transports')
      .update(
        { _id: Number(input._id) },
        { $set: input }
      ).then( doc => {
        console.log(`doc : ${JSON.stringify(doc)}`);
        callback(input);
      });
    },
    getAllTransports() {
      return mPool.collection('transports')
        .find({})
        .toArray()
        .then(rows => rows)
        ;
    },
    searchTransports(orig, dst, loadSdt, loadEdt, unloadSdt, unloadEdt, type){
       var q = {}; // declare the query object
       q['$and']=[]; // filter the search by any criteria given by the user
       if(orig){ // if the criteria has a value or values
         q["$and"].push({ orig: orig}); // add to the query object
       }
       if(dst){ // if the criteria has a value or values
        q["$and"].push({ dst: dst}); // add to the query object
      }
       if(loadSdt && loadEdt){
        q["$and"].push({ loadDt: {$gte: loadSdt, $lte: loadEdt }});
       }
       if(unloadSdt && unloadEdt){
        q["$and"].push({ unloadDt: {$gte: unloadSdt, $lte: unloadEdt }});
       }
       if(type){
        q["$and"].push({ type: type});
      }
    
      console.log(q);

      return mPool.collection('transports')
        .find(q)
        .toArray()
        .then(rows => {
          return rows
        });
    },
    findTrades(ids){
      var q = {};
     return mPool.collection('trades')
       .find(
         {_id : {$in : ids}}
       )
       .toArray()
       .then(rows => {
         return rows
       });
    },
    findTrans(ids){
      var q = {};
      return mPool.collection('transports')
        .find(
          {_id : {$in : ids}}
        )
        .toArray()
        .then(rows => {
          return rows
        });
    },
    findTransCat(category){
      let buyQuery = {
        stocks: {
          $elemMatch : {
            buy: { $exists: true }
          }
        }
      };
      let sellQuery = {
        stocks: {
          $elemMatch : {
            sell: { $exists: true }
          }
        }
      };
      let q = category==='purchase'? buyQuery : sellQuery;
      return mPool.collection('transports')
      .find(
        q
      )
      .toArray()
      .then(rows => {
        return rows
      });
    },
    nominateTrade(input, callback) {
      console.log(`nominate trade input : ${input}`);
      this.getNextSequenceValue("stockId", (id) => {
        let stock = {
          stockId : id,
          buy: input.buys,
          sell: input.sells
        };
        mPool.collection('transports')
        .update(
          { _id: Number(input.transId) },
          { $push: {"stocks": stock} }
        ).then( doc => {
          console.log(`transport updated with id : ${input.transId}`);
          console.log(`doc : ${JSON.stringify(doc)}`);
          let tradeIds = [];
          tradeIds.push(...input.buys);
          tradeIds.push(...input.sells);
          mPool.collection('trades')
          .updateMany(
            { _id: {$in : tradeIds} },
            { $set: {"transportId" : input.transId, "status" : "NOMINATED"} }
          ).then( (docTrade) => {
            console.log(`trades updated with transportId : ${input.transId}`);
            callback({stockId: id});
          });
        });
      });
    }
  };
};
