const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList
  } = require('graphql');

  var GraphQLDate = require('graphql-date');
  
  module.exports = new GraphQLObjectType({
    name: 'Transport',
  
    fields: () => {
      const TransportType = require('./enums/transport-type');
      const StockType = require('./stock');
  
      return {
        transId: { 
            type: GraphQLID,
            resolve: (obj, args) => {
                return obj._id;
            }
        },
        orig: { type: new GraphQLNonNull(GraphQLString) },
        dst: { type: new GraphQLNonNull(GraphQLString) },
        loadDt: { type: GraphQLDate },
        unloadDt: { type: GraphQLDate },
        type: { type: new GraphQLNonNull(TransportType) },
        stocks: { type: new GraphQLList(StockType)}
      };
    }
  });
  