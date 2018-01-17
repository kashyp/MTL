const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLFloat,
    GraphQLInt
  } = require('graphql');

  const SideType = require('../enums/trade-side');
  const StatusType = require('../enums/trade-status');
  const GraphQLDate = require('graphql-date');
  
  module.exports = new GraphQLInputObjectType({
    name: 'TradeUpdateInput',
    //TODO make the types enums
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLInt)},
        side: { type: GraphQLString },
        qty: { type: GraphQLFloat },
        price: { type: GraphQLFloat },
        tradeDt: { type: GraphQLDate },
        cmdty: { type: GraphQLString },
        loc: { type: GraphQLString },
        cp: { type: GraphQLString },
        status: { type: GraphQLString }
    }
  });
  