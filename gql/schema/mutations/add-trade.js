const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLNonNull
  } = require('graphql');
  
  const mdb = require('../../database/mdb');
  const TradeType = require('../types/trade');
  const SideType = require('../types/enums/trade-side');
  const GraphQLDate = require('graphql-date');
  const TradeInputType = require('../types/inputs/trade-input');
  
  module.exports = {
    type: TradeType,
    args: {
      input: { type: new GraphQLNonNull(TradeInputType) }
    },
    resolve(obj, { input }, { mPool }) {
    //return mdb(mPool).addNewTrade(input);
    return new Promise((resolve, reject)=>{
        mdb(mPool).addNewTrade(input, (result) => {
        return resolve(result);
        });
    });
    }
  };
  