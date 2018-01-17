const humps = require('humps');
const _ = require('lodash');
const _ALL_TRADES_URL = "http://localhost:8888/allTrades";
const _INSERT_TRADE_URL = "http://localhost:8888/addTrade";
require('isomorphic-fetch');
var request = require("request");

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  orderedFor: (rows, collection, field, singleObject) => {
    // return the rows ordered for the collection
    const data = humps.camelizeKeys(rows);
    const inGroupsOfField = _.groupBy(data, field);
    return collection.map(element => {
      const elementArray = inGroupsOfField[element];
      if (elementArray) {
        return singleObject ? elementArray[0] : elementArray;
      }
      return singleObject ? {} : [];
    });
  },
  slug: str => {
    return str.toLowerCase().replace(/[\s\W-]+/, '-');
  },
  findAllTrades: () =>{
    return fetch(_ALL_TRADES_URL)
    .then(res => res.json())
    .catch(error => {
      console.log('Error fetching all trades.')
    });
  },
  insertTrade: (tradeInput) =>{
    console.log(`Inside insertTrade with tradeInput : ${ JSON.stringify(tradeInput)}`);
    return request({
      uri: _INSERT_TRADE_URL,
      method: "POST",
      form: {
        input: JSON.stringify(tradeInput)
      }
    }, function(error, response, body) {
      console.log(`body : ${body} ${response}`);
      return body;
    }); 
    // console.log(`Inside insertTrade with tradeInput : ${ JSON.stringify(tradeInput)}`);
    // return fetch(_INSERT_TRADE_URL, {
    //   method: "POST",
    //   body: JSON.stringify(tradeInput)
    // })
    // .then(res => {
    //   console.log(`res : ${res.json()}`);
    //   return res.json();
    // })
    // .then(data => data)
    // .catch(error => {
    //   console.log(`Error adding trade ${error}`)
    // });
  }
};
