const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull
  } = require('graphql');

  var GraphQLDate = require('graphql-date');
  
  module.exports = new GraphQLObjectType({
    name: 'Transfer',
  
    fields: () => {
      const TradeType = require('./trade');
      const TransferStatusType = require('./enums/transfer-status');
      return {
        transferId: { type: GraphQLID },
        transferDt: { type: GraphQLDate },
        status: { type: new GraphQLNonNull(TransferStatusType) },
        trade: { type: new GraphQLNonNull(TradeType) }
      };
    }
  });
  