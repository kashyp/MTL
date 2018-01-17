const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLFloat,
    GraphQLInt
  } = require('graphql');

  var GraphQLDate = require('graphql-date');
  
  module.exports = new GraphQLObjectType({
    name: 'Trade',
  
    fields: () => {
      const StatusType = require('./enums/trade-status');
      const SideType = require('./enums/trade-side');
      const TransferType = require('./transfer');
  
      return {
        tradeId: { 
            type: GraphQLID,
            resolve: (obj, args) => {
              return obj._id;
              //return obj.id;
            }
        },
        side: { type: new GraphQLNonNull(SideType) },
        qty: { type: new GraphQLNonNull(GraphQLFloat) },
        price: { type: GraphQLFloat },
        tradeDt: { type: GraphQLDate },
        status: { type: new GraphQLNonNull(StatusType) },
        cmdty: { type: new GraphQLNonNull(GraphQLString) },
        cp: { type: new GraphQLNonNull(GraphQLString) },
        loc: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: { type: GraphQLDate },
        transportId: { type: GraphQLInt }
      };
    }
  });
  