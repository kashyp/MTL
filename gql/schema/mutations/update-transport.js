const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLID,
    GraphQLNonNull
  } = require('graphql');
  
  const mdb = require('../../database/mdb');
  const TransType = require('../types/transport');
  const SideType = require('../types/enums/trade-side');
  const GraphQLDate = require('graphql-date');
  const TransUpdateInputType = require('./../types/inputs/update-trans-input');

  module.exports = {
    type: TransType,
    args: {
      input: { type: new GraphQLNonNull(TransUpdateInputType) }
    },
    resolve(obj, { input }, { mPool }) {
    return new Promise((resolve, reject) => {
        mdb(mPool).updateTrans(input, (result) => {
            return resolve(result);
        });
    });
    }
  };
  