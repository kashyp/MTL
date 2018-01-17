const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLNonNull
  } = require('graphql');
  
  const mdb = require('../../database/mdb');
  const TransInputType = require('../types/inputs/trans-input');
  const TransType = require('../types/transport');
  
  module.exports = {
    type: TransType,
    args: {
      input: { type: new GraphQLNonNull(TransInputType) }
    },
    resolve(obj, { input }, { mPool }) {
    return new Promise((resolve, reject)=>{
        mdb(mPool).addNewTrans(input, (result) => {
          return resolve(result);
        });
    });
    }
  };
  