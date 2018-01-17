const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLID,
    GraphQLNonNull
  } = require('graphql');
  
  const mdb = require('../../database/mdb');
  const TradeType = require('../types/trade');
  const SideType = require('../types/enums/trade-side');
  const GraphQLDate = require('graphql-date');
  const TradeUpdateInputType = require('./../types/inputs/update-trade-input');

  module.exports = {
    type: TradeType,
    args: {
      input: { type: new GraphQLNonNull(TradeUpdateInputType) }
    },
    resolve(obj, { input }, { mPool }) {
    return new Promise((resolve, reject) => {
        console.log('in here');
        mdb(mPool).updateTrade(input, (result) => {
            return resolve(result);
        });
    });
    }
  };
  