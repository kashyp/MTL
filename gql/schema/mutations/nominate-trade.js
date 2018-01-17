const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLNonNull
  } = require('graphql');
  
  const mdb = require('../../database/mdb');
  const StockType = require('../types/stock');
  const NominateTradeInputType = require('../types/inputs/nominate-trade-input');
  
  module.exports = {
    type: StockType,
    args: {
      input: { type: new GraphQLNonNull(NominateTradeInputType) }
    },
    resolve(obj, { input }, { mPool }) {
    return new Promise((resolve, reject)=>{
        mdb(mPool).nominateTrade(input, (result) => {
        return resolve(result);
        });
    });
    }
  };
  